CREATE TABLE dbo.Lookup_Items (
    ID INT IDENTITY(1,1) NOT NULL,
    Lookup_Category_ID INT NOT NULL,
    Title NVARCHAR(250) NOT NULL
    CONSTRAINT PK_Lookup_Items
        PRIMARY KEY CLUSTERED (ID),
    CONSTRAINT FK_Lookup_Items
        FOREIGN KEY (Lookup_Category_ID)
        REFERENCES dbo.Lookup_Categories (ID)
)
