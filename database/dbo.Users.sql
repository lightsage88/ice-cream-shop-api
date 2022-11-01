CREATE TABLE dbo.Users (
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
