USE [InloTEC]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[ColorValue] [nvarchar](16) NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses_Details]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses_Details](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdLocations] [bigint] NOT NULL,
	[IdTeachers] [bigint] NOT NULL,
	[IdCourses] [bigint] NOT NULL,
	[IdPrograms] [bigint] NOT NULL,
	[IdSchedule] [bigint] NOT NULL,
	[IdModality] [bigint] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[Notes] [nvarchar](512) NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Courses_Details] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses_Details_Groups]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses_Details_Groups](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdGroups] [bigint] NOT NULL,
	[IdCourses_Details] [bigint] NOT NULL,
	[Deleted] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses_Programs]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses_Programs](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdPrograms] [bigint] NOT NULL,
	[Idcourses] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Days]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Days](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Days] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Errors]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Errors](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](100) NULL,
	[errorNumber] [int] NULL,
	[errorState] [int] NULL,
	[errorSeverity] [int] NULL,
	[errorLine] [int] NULL,
	[errorProcedure] [varchar](max) NULL,
	[errorMessage] [varchar](max) NULL,
	[errorDatetime] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Holidays]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Holidays](
	[Id] [bigint] IDENTITY NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[StartDatetime] [datetime] NOT NULL,
	[EndDatetime] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hours]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hours](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Hours] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Locations]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Locations](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Locations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Modality]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modality](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nchar](64) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Modality] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Programs]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Programs](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Programs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nchar](128) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Schedule] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule_Days]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule_Days](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdDays] [bigint] NOT NULL,
	[IdHours] [bigint] NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Schedule_Days] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleDays_Schedule]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleDays_Schedule](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdSchedule_Days] [bigint] NOT NULL,
	[IdSchedule] [bigint] NOT NULL,
	[Deleted] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teachers]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teachers](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[IdentityNumber] [nvarchar](64) NOT NULL,
	[Email] [nvarchar](128) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Teachers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](64) NOT NULL,
	[LastName1] [nvarchar](64) NOT NULL,
	[LastName2] [nvarchar](64) NOT NULL,
	[Passwordhash] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Deleted] [int] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users_Roles]    Script Date: 9/20/2024 9:59:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users_Roles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdUsers] [bigint] NOT NULL,
	[IdRoles] [bigint] NOT NULL,
	[Deleted] [int] NOT NULL,
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
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Locations] FOREIGN KEY([IdLocations])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Locations]
GO
ALTER TABLE [dbo].[Courses_Details]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Modality] FOREIGN KEY([IdModality])
REFERENCES [dbo].[Modality] ([id])
GO
ALTER TABLE [dbo].[Courses_Details] CHECK CONSTRAINT [FK_Courses_Details_Modality]
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
ALTER TABLE [dbo].[Courses_Details_Groups]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Groups_Courses_Details] FOREIGN KEY([IdCourses_Details])
REFERENCES [dbo].[Courses_Details] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details_Groups] CHECK CONSTRAINT [FK_Courses_Details_Groups_Courses_Details]
GO
ALTER TABLE [dbo].[Courses_Details_Groups]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Details_Groups_Groups] FOREIGN KEY([IdGroups])
REFERENCES [dbo].[Groups] ([Id])
GO
ALTER TABLE [dbo].[Courses_Details_Groups] CHECK CONSTRAINT [FK_Courses_Details_Groups_Groups]
GO
ALTER TABLE [dbo].[Courses_Programs]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Programs_Courses1] FOREIGN KEY([Idcourses])
REFERENCES [dbo].[Courses] ([Id])
GO
ALTER TABLE [dbo].[Courses_Programs] CHECK CONSTRAINT [FK_Courses_Programs_Courses1]
GO
ALTER TABLE [dbo].[Courses_Programs]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Programs_Programs1] FOREIGN KEY([IdPrograms])
REFERENCES [dbo].[Programs] ([Id])
GO
ALTER TABLE [dbo].[Courses_Programs] CHECK CONSTRAINT [FK_Courses_Programs_Programs1]
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

INSERT INTO ROLES ([Name],[Deleted])
VALUES('Admin',0),
	  ('Normal_User',0),
	  ('Protected',0)

INSERT INTO Users([Name], [LastName1], [LastName2], [Passwordhash], [Email], [Deleted])
VALUES('admin','admin','admin','admin','admin@admin.com',0)

INSERT INTO Users_Roles ([IdUsers], [IdRoles], [Deleted])
VALUES (1,1,0)

INSERT INTO Modality ([Name],[Deleted])
VALUES('Presencial',0),
	  ('Virtual',0),
	  ('Semi-Presencial',0)
	                                                        
INSERT INTO Locations ([Name],[Deleted])
VALUES('Cartago',0)                                     

INSERT INTO Programs ([Name],[Deleted])
VALUES('Técnico en Inventarios y Logística',0) 
           
INSERT INTO Courses ([Name],[ColorValue],[Deleted])
VALUES
('Introducción a la Logística','Introducción a la Logística',0),
('Infraestructura de Almacenes','Infraestructura de Almacenes',0),
('Administración de Bodegas e Inventarios I','Administración de Bodegas e Inventarios I',0),
('Administración de Transporte','Administración de Transporte',0),
('Administración de Bodegas e Inventarios II','Administración de Bodegas e Inventarios II',0),
('Matemática','Matemática',0),
('Costos Logísticos','Costos Logísticos',0),
('Estadística','Estadística',0),
('Planificación de la Producción y de Servicios','Planificación de la Producción y de Servicios',0),
('Administración de Abastecimiento y Compras','Administración de Abastecimiento y Compras',0),
('Comunicación','Comunicación',0),
('Inventarios y Modelos de Pronósticos','Inventarios y Modelos de Pronósticos',0),
('Proyecto de Graduación','Proyecto de Graduación',0)


INSERT INTO Courses_Programs([IdPrograms],[IdCourses],[Deleted])
VALUES(1,1,0),
	  (1,2,0),
	  (1,3,0),
	  (1,4,0),
	  (1,5,0),
	  (1,6,0),
	  (1,7,0),
	  (1,8,0),
	  (1,9,0),
	  (1,10,0),
	  (1,11,0),
	  (1,12,0),
	  (1,13,0)
