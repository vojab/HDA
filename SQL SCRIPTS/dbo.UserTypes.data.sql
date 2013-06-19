SET IDENTITY_INSERT [dbo].[UserTypes] ON
INSERT INTO [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [UserTypeDescription], [DateCreated]) VALUES (1, N'ADMIN', N'Administrator of system, has all permissions', N'2013-04-15 00:00:00')
INSERT INTO [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [UserTypeDescription], [DateCreated]) VALUES (2, N'HELPDESK', N'Help Desk Personell, mediator for routing help desk requests to the business providers and clients', N'2013-04-15 00:00:00')
INSERT INTO [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [UserTypeDescription], [DateCreated]) VALUES (3, N'CLIENT', N'Client, creates and watches help desk requests', N'2013-04-15 00:00:00')
INSERT INTO [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [UserTypeDescription], [DateCreated]) VALUES (4, N'BUSINESS', N'Business providers, resolve help desk requests, enters relevant information of job that is done', N'2013-04-15 00:00:00')
SET IDENTITY_INSERT [dbo].[UserTypes] OFF
