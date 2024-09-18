USE [InloTEC]
GO

DROP TABLE IF EXISTS [dbo].[Users_Roles];
DROP TABLE IF EXISTS [dbo].[Users];

DROP TABLE IF EXISTS [dbo].[Roles];
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Courses;
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Locations;
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Modality;
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Programs;
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Schedule;
ALTER TABLE [Courses_Details] DROP CONSTRAINT FK_Courses_Details_Teachers;
DROP TABLE IF EXISTS [dbo].[Courses_Details_Groups];
DROP TABLE IF EXISTS [dbo].[Courses_Details];
DROP TABLE IF EXISTS [dbo].[Courses];
DROP TABLE IF EXISTS [dbo].[Programs];
DROP TABLE IF EXISTS [dbo].[Locations];
DROP TABLE IF EXISTS [dbo].[Teachers];
DROP TABLE IF EXISTS [dbo].[ScheduleDays_Schedule];
DROP TABLE IF EXISTS [dbo].[Schedule_Days];
DROP TABLE IF EXISTS [dbo].[Schedule];
DROP TABLE IF EXISTS [dbo].[Hours];
DROP TABLE IF EXISTS [dbo].[Groups];
DROP TABLE IF EXISTS [dbo].[Days];
DROP TABLE IF EXISTS [dbo].[Modality];

DROP TABLE IF EXISTS [dbo].[Change_Log];
DROP TABLE IF EXISTS [dbo].[Errors];