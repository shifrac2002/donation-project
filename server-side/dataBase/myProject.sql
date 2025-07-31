
 create database shul;
USE shul;
  
 CREATE TABLE Status (
  StatusId INT NOT NULL AUTO_INCREMENT,
  nameStatus VARCHAR(255) not null,
  PRIMARY KEY (StatusId)
);
  create table Customers(
      CustomerId int NOT NULL  AUTO_INCREMENT,
      FirstName nvarchar(255) NOT NULL,
      LastName nvarchar(255) NOT NULL,
      PhoneCustomers varchar(255) NOT NULL,
     Mail varchar(255),
     StatusId int NOT NULL,
     PRIMARY KEY (CustomerId),
 	FOREIGN KEY (StatusId) REFERENCES Status(StatusId)
  );
 create table Cities(
   CityId int  NOT NULL  AUTO_INCREMENT,
     nameCity varchar(255) NOT NULL,
    PRIMARY KEY (CityId)
  );
   create table Shuls(
     ShulId int NOT NULL  AUTO_INCREMENT,
   NameShul nvarchar(255) NOT NULL,
    Address nvarchar(255) NOT NULL,
     PhoneGabay varchar(255) NOT NULL,
    CityId int NOT NULL ,
     PRIMARY KEY (ShulId),
   FOREIGN KEY (CityId) REFERENCES Cities(CityId)
  );
  create table Items(
    ItemId int NOT NULL  AUTO_INCREMENT,
    NameItem nvarchar(255) NOT NULL,
   Amount double NOT NULL,
     check(Amount>=5),
    ShulId int NOT NULL ,
     Donated bool DEFAULT  false,
   PRIMARY KEY (itemId),
   FOREIGN KEY (ShulId) REFERENCES Shuls(ShulId)
   );

   create table Donations(
    DonationsId int NOT NULL  AUTO_INCREMENT,
    ItemId int NOT NULL ,
    PRIMARY KEY (DonationsId),
   FOREIGN KEY (ItemId) REFERENCES Items(ItemId)
  );


