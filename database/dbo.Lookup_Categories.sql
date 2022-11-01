CREATE TABLE dbo.Lookup_Categories (
    ID INT IDENTITY(1,1) NOT NULL,
    Title NVARCHAR(250) NOT NULL
    CONSTRAINT PK_Lookup_Categories
        PRIMARY KEY CLUSTERED (ID)
)
