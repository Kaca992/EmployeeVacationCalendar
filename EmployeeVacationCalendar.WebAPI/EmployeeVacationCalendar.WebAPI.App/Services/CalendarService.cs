﻿using EmployeeVacationCalendar.WebAPI.App.Util;
using EmployeeVacationCalendar.WebAPI.Common.DTO;
using EmployeeVacationCalendar.WebAPI.Common.Enums;
using EmployeeVacationCalendar.WebAPI.Common.Exceptions;
using EmployeeVacationCalendar.WebAPI.Database;
using EmployeeVacationCalendar.WebAPI.Database.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeVacationCalendar.WebAPI.App.Services
{
    public interface ICalendarService
    {
        /// <summary>
        /// Get calendar entries for the selected month
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        List<CalendarEntryDTO> GetCalendarEntries(int year, int month);
        /// <summary>
        /// Get calendar entry by id
        /// </summary>
        /// <param name="entryId"></param>
        /// <returns></returns>
        Task<CalendarEntryDTO> GetCalendarEntryById(int entryId);
        /// <summary>
        /// If existing entry it will update it, otherwise a new entry will be created.
        /// </summary>
        /// <param name="loggedUserId"></param>
        /// <param name="loggedUserType"></param>
        /// <param name="entryDTO"></param>
        /// <returns></returns>
        Task<CalendarEntryDTO> AddUpdateCalendarEntry(string loggedUserId, EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO);
        /// <summary>
        /// Deletes calendar entry if user has permissions to do it.
        /// </summary>
        /// <param name="loggedUserId"></param>
        /// <param name="loggedUserType"></param>
        /// <param name="entryDTO"></param>
        /// <returns></returns>
        Task DeleteCalendarEntry(string loggedUserId, EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO);
    }

    public class CalendarService: ICalendarService
    {
        EmployeeVacationDbContext _context;
        UserManager<Employee> _userManager;

        public CalendarService(EmployeeVacationDbContext context, UserManager<Employee> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public List<CalendarEntryDTO> GetCalendarEntries(int year, int month)
        {
            var startDate = new DateTime(year, month, 1);
            var endDate = startDate.AddMonths(1);

            return _context
                .CalendarEntries
                .Where(x => x.StartDate >= startDate && x.StartDate < endDate || x.EndDate >= startDate && x.StartDate < startDate)
                .Select(x => DtoMapper.MapCalendarEntryToDTO(x))
                .ToList();
        }

        public async Task<CalendarEntryDTO> GetCalendarEntryById(int entryId)
        {
            var entry = await _context.CalendarEntries.FindAsync(entryId);

            if (entry == null)
            {
                throw new ArgumentException("Entry was deleted by someone else.");
            }

            return DtoMapper.MapCalendarEntryToDTO(entry);
        }

        #region Add or update calendar entry
        public async Task<CalendarEntryDTO> AddUpdateCalendarEntry(string loggedUserId, EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO)
        {
            if (entryDTO.EmployeeId != loggedUserId && loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            if (entryDTO.StartDate >= entryDTO.EndDate) throw new ArgumentException("End Date must be after Start Date");

            CalendarEntry entry = entryDTO.IsNew ? await addCalendarEntry(loggedUserType, entryDTO) : await updateCalendarEntry(loggedUserId, loggedUserType, entryDTO);

            await _context.SaveChangesAsync();
            return DtoMapper.MapCalendarEntryToDTO(entry);
        }

        private async Task<CalendarEntry> addCalendarEntry(EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO)
        {
            var entry = new CalendarEntry
            {
                StartDate = entryDTO.StartDate,
                EndDate = entryDTO.EndDate,
                VacationType = entryDTO.VacationType,
                EmployeeId = entryDTO.EmployeeId
            };

            _context.CalendarEntries.Add(entry);
            return entry;
        }

        private async Task<CalendarEntry> updateCalendarEntry(string loggedUserId, EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO)
        {

            var entry = await _context.CalendarEntries.FindAsync(entryDTO.Id);

            if (entry == null)
            {
                throw new ArgumentException("Entry was deleted by someone else.");
            }

            validateConcurrencyStamp(entryDTO, entry);

            entry.StartDate = entryDTO.StartDate;
            entry.EndDate = entryDTO.EndDate;
            entry.VacationType = entryDTO.VacationType;
            entry.EmployeeId = entryDTO.EmployeeId;

            return entry;
        }

        #endregion

        public async Task DeleteCalendarEntry(string loggedUserId, EmployeeTypeEnum loggedUserType, CalendarEntryDTO entryDTO)
        {
            var entry = await _context.CalendarEntries.FindAsync(entryDTO.Id);

            if (entry == null) return;
            if (entry.EmployeeId != loggedUserId && loggedUserType == EmployeeTypeEnum.User) throw new AdminRoleRequiredException();
            validateConcurrencyStamp(entryDTO, entry);

            _context.CalendarEntries.Remove(entry);
            await _context.SaveChangesAsync();
        }

        private static void validateConcurrencyStamp(CalendarEntryDTO entryDTO, CalendarEntry entry)
        {
            if (entry.ConcurrencyStamp.Length != entryDTO.ConcurrencyStamp.Length || entry.ConcurrencyStamp.Any(x => !entryDTO.ConcurrencyStamp.Contains(x))) throw new ValuesChangedByAnotherUserException();
        }
    }
}
