--Delete the tables



DROP TABLE Users;
DROP TABLE Lookup_Items;

TRUNCATE TABLE Lookup_Categories;

--Build the data-tables

IF NOT EXISTS (SELECT *
FROM sysobjects
WHERE name='Lookup_Categories')
    CREATE TABLE Lookup_Categories
(
    ID INT IDENTITY(1,1) NOT NULL,
    Title NVARCHAR(250) NOT NULL
        CONSTRAINT PK_Lookup_Categories
        PRIMARY KEY CLUSTERED (ID)
)
GO
IF NOT EXISTS (SELECT *
FROM sysobjects
WHERE name='Lookup_Items')
    CREATE TABLE Lookup_Items
(
    ID INT IDENTITY(1,1) NOT NULL,
    Lookup_Category_ID INT NOT NULL,
    Title NVARCHAR(250) NOT NULL
        CONSTRAINT PK_Lookup_Items
        PRIMARY KEY CLUSTERED (ID),
    CONSTRAINT FK_Lookup_Items
        FOREIGN KEY (Lookup_Category_ID)
        REFERENCES dbo.Lookup_Categories (ID)
)
GO

IF NOT EXISTS (SELECT *
FROM sysobjects
WHERE name='Users')
    CREATE TABLE Users
(
    ID INT IDENTITY(1,1) NOT NULL,
    Username NVARCHAR(250) NOT NULL,
    Email_Address NVARCHAR(500) NOT NULL,
    [Password] NVARCHAR(MAX) NOT NULL,
    First_Name NVARCHAR(250) NOT NULL,
    Last_Name NVARCHAR(250) NOT NULL,
    Gender_Lookup_Item_ID INT NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY CLUSTERED (ID),
    CONSTRAINT FK_Users 
        FOREIGN KEY (Gender_Lookup_Item_ID)
        REFERENCES dbo.Lookup_Items (ID)
)
GO

--Insert values into the tables

--Inserting records into dbo.Lookup_Categories
SET IDENTITY_INSERT dbo.Lookup_Categories ON;
INSERT INTO Lookup_Categories
    (ID, Title)
VALUES
    (1, 'Gender');
INSERT INTO Lookup_Categories
    (ID, Title)
VALUES
    (2, 'Treat_Type');
SET IDENTITY_INSERT dbo.Lookup_Categories OFF;

--Inserting records into dbo.Lookup_Items
--Inserting records into Gender Lookup_Category
SET IDENTITY_INSERT dbo.Lookup_Items ON;
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (1, 1, 'Female');
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (2, 1, 'Male');
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (3, 1, 'Other');
--Inserting records into Treat_Type category
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (21, 2, 'Ice_Cream');
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (22, 2, 'Cookies');
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (23, 2, 'Cake');
INSERT INTO Lookup_Items
    (ID, Lookup_Category_ID, Title)
VALUES
    (24, 2, 'Pie');
SET IDENTITY_INSERT dbo.Lookup_Items OFF;
--Inserting records into dbo.Users
SET IDENTITY_INSERT dbo.Users ON;
INSERT INTO Users
    (ID, Username, Email_Address, [Password], First_Name, Last_Name, Gender_Lookup_Item_ID)
VALUES
    (1, 'admin', 'adrian.e.rosales@gmail.com', 'password', 'Adrian', 'Rosales', 2);
SET IDENTITY_INSERT dbo.Users OFF;

