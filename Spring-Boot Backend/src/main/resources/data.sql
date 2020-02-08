INSERT INTO Users (id,email, mobile, name, password, referral_code, role) values ('User1','roger@wipro.com','7842608084','Roger Kutcher','wipro@123','RogerToken_2211','admin');
INSERT INTO Users (id,email, mobile, name, password, referral_code, role) values ('DMS_User2','steve@wipro.com','7842608084','Steve Martin','wipro@123','SteveToken_3271','motivator');
INSERT INTO Users (id,email, mobile, name, password, referral_code, role) values ('DMS_User3','chandra@wipro.com','7842608084','Chandra','wipro@123','SteveToken_327','challenger');
INSERT INTO Batch (batch_Id,batch_Name,start_Date,end_Date,measurment_Date) values ('Batch1','BelowBMI25',
parsedatetime('12-12-2019', 'dd-MM-yyyy'),
parsedatetime('12-09-2020', 'dd-MM-yyyy'),
parsedatetime('10', 'dd'));
INSERT INTO Batch (batch_Id,batch_Name,start_Date,end_Date,measurment_Date) values ('Batch2','AboveBMI25',
parsedatetime('12-12-2019', 'dd-MM-yyyy'),
parsedatetime('12-09-2020', 'dd-MM-yyyy'),
parsedatetime('10', 'dd'));
INSERT INTO Group11 (group_name, batch_id) values ('Group1-A','Batch1');
INSERT INTO Group11 (group_name, batch_id) values ('Group1-B','Batch1');
INSERT INTO Group11 (group_name, batch_id) values ('Group2-A','Batch2');
INSERT INTO Group11 (group_name, batch_id) values ('Group2-B','Batch2');
