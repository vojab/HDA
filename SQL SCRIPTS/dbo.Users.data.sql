SET IDENTITY_INSERT [dbo].[Users] ON
INSERT INTO [dbo].[Users] ([UserId], [UserName], [Password], [UserDescription], [UserStatus], [UserTypeId], [DateCreated]) VALUES (2, N'admin', N'test', N'Administrator', 1, 1, N'2013-12-27 00:00:00')
INSERT INTO [dbo].[Users] ([UserId], [UserName], [Password], [UserDescription], [UserStatus], [UserTypeId], [DateCreated]) VALUES (4, N'helpdesk', N'test', N'Help Desk', 1, 2, N'2014-05-03 00:00:00')
INSERT INTO [dbo].[Users] ([UserId], [UserName], [Password], [UserDescription], [UserStatus], [UserTypeId], [DateCreated]) VALUES (5, N'client', N'test', N'Client', 1, 3, N'2014-05-03 00:00:00')
INSERT INTO [dbo].[Users] ([UserId], [UserName], [Password], [UserDescription], [UserStatus], [UserTypeId], [DateCreated]) VALUES (6, N'business', N'test', N'Business Provider', 1, 3, N'2014-05-03 00:00:00')
SET IDENTITY_INSERT [dbo].[Users] OFF
