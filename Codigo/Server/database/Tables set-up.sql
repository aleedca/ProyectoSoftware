/****** Object:  Table [dbo].[Change_Log]    Script Date: 8/17/2024 4:47:46 PM ******/
USE [InloTEC]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Errors]
(
    -- Keys
    [id] INT NOT NULL PRIMARY KEY IDENTITY(1,1),

    -- Other fields
    [username] VARCHAR(100) NULL,
    [errorNumber] INT NULL,
    [errorState] INT NULL,
    [errorSeverity] INT NULL,
    [errorLine] INT NULL,
    [errorProcedure] VARCHAR(MAX) NULL,
    [errorMessage] VARCHAR(MAX) NULL,
    [errorDatetime] DATETIME NOT NULL
);

CREATE TABLE [dbo].[Change_Log](
	[Id] [bigint] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses_Details]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses_Details](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[IdLocations] [bigint] NOT NULL,
	[IdGroups] [bigint] NOT NULL,
	[IdTeachers] [bigint] NOT NULL,
	[IdCourses] [bigint] NOT NULL,
	[IdPrograms] [bigint] NOT NULL,
	[IdSchedule] [bigint] NOT NULL,
	[Notes] [nvarchar](512) NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Courses_Details] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Days]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Days](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Days] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hours]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hours](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Hours] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Programs]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Programs](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](128) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Programs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nchar](128) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Schedule] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule_Days]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule_Days](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[IdDays] [bigint] NOT NULL,
	[IdHours] [bigint] NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Schedule_Days] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleDays_Schedule]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleDays_Schedule](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[IdSchedule_Days] [bigint] NOT NULL,
	[IdSchedule] [bigint] NOT NULL,
	[Deleted] INT NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teachers]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teachers](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](128) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Teachers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[Username] [nvarchar](64) NOT NULL,
	[Passwordhash] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users_Roles]    Script Date: 8/17/2024 4:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users_Roles](
	[Id] [bigint] NOT NULL IDENTITY(1,1),
	[IdUsers] [bigint] NOT NULL,
	[IdRoles] [bigint] NOT NULL,
	[Deleted] INT NOT NULL,
 CONSTRAINT [PK_Users_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Courses] FOREIGN KEY([IdCourses])
REFERENCES [dbo].[Courses] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Courses]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Groups] FOREIGN KEY([IdGroups])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Groups]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Locations] FOREIGN KEY([IdLocations])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Locations]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Programs] FOREIGN KEY([IdPrograms])
REFERENCES [dbo].[Programs] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Programs]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Schedule] FOREIGN KEY([IdSchedule])
REFERENCES [dbo].[Schedule] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Schedule]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Teachers] FOREIGN KEY([IdTeachers])
REFERENCES [dbo].[Teachers] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Teachers]
GO
ALTER TABLE [dbo].[Schedule_Days]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Days_Days] FOREIGN KEY([IdDays])
REFERENCES [dbo].[Days] ([Id])
GO
ALTER TABLE [dbo].[Schedule_Days] CHECK CONSTRAINT [FK_Schedule_Days_Days]
GO
ALTER TABLE [dbo].[Schedule_Days]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Days_Hours] FOREIGN KEY([IdHours])
REFERENCES [dbo].[Hours] ([Id])
GO
ALTER TABLE [dbo].[Schedule_Days] CHECK CONSTRAINT [FK_Schedule_Days_Hours]
GO
ALTER TABLE [dbo].[ScheduleDays_Schedule]  WITH CHECK ADD  CONSTRAINT [FK_ScheduleDays_Schedule_Schedule] FOREIGN KEY([IdSchedule])
REFERENCES [dbo].[Schedule] ([Id])
GO
ALTER TABLE [dbo].[ScheduleDays_Schedule] CHECK CONSTRAINT [FK_ScheduleDays_Schedule_Schedule]
GO
ALTER TABLE [dbo].[ScheduleDays_Schedule]  WITH CHECK ADD  CONSTRAINT [FK_ScheduleDays_Schedule_Schedule_Days] FOREIGN KEY([IdSchedule_Days])
REFERENCES [dbo].[Schedule_Days] ([Id])
GO
ALTER TABLE [dbo].[ScheduleDays_Schedule] CHECK CONSTRAINT [FK_ScheduleDays_Schedule_Schedule_Days]
GO
ALTER TABLE [dbo].[Users_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles_Roles] FOREIGN KEY([IdRoles])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[Users_Roles] CHECK CONSTRAINT [FK_Users_Roles_Roles]
GO
ALTER TABLE [dbo].[Users_Roles]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles_Users] FOREIGN KEY([IdUsers])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Users_Roles] CHECK CONSTRAINT [FK_Users_Roles_Users]
GO

USE [InloTEC]
INSERT INTO [dbo].[Roles] ([Name], [Deleted])
    VALUES
	('Admin',0),
	('Normal_User',0),
	('Protected',0);

INSERT INTO [dbo].[Days] ([Name], [Deleted])
    VALUES
	('Lunes',0),
	('Martes',0),
	('Miércoles',0),
	('Jueves',0),
	('Viernes',0),
	('Sabado',0),
	('Domingo',0);