﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
using FIT.HDA.BL.Enums;
using FIT.HDA.DAL;
using FIT.HDA.DAL.Repositories;
using FIT.HDA.Models;

namespace FIT.HDA.API.Controllers
{
    public class UserAPIController : ApiController
    {
        private readonly UserRepository _userRepository;

        public UserAPIController()
        {
            _userRepository = new UserRepository();
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> users;

            try
            {
                users = _userRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return users;
        }

        [System.Web.Http.ActionName("GetUserByUserNameAndPassword")]
        [System.Web.Http.HttpGet]
        public string GetUserByUserNameAndPassword(string username, string password)
        {
            var user = new User();

            try
            {
                user = _userRepository.GetUserByUserNameAndPassword(username, password);
                if (user != null)
                {
                    return Newtonsoft.Json.JsonConvert.SerializeObject(user);
                } else
                {
                    return "badcredientials";
                }

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }           
        }

        [System.Web.Http.ActionName("save")]
        [System.Web.Http.HttpGet]
        public string SaveRequest(string userdescription,
                                  string usertypeid,
                                  string password,
                                  string username)
        {
            try
            {
                var user = new User();

                user.UserName = username;
                user.Password = password;
                user.UserDescription = userdescription;
                // TODO: Be defensive here - parse to int problem?
                user.UserTypeId = Int32.Parse(usertypeid);
                user.UserStatus = (int)HelpDeskEnums.Status.Active;
                user.DateCreated = DateTime.Now;

                _userRepository.SaveUser(user);

                return "success";
            }
            catch (Exception e)
            {
                return "error";
            }
        }

        [System.Web.Http.ActionName("DeleteUser")]
        [System.Web.Http.HttpGet]
        public string DeleteUser(string userid)
        {
            try
            {
                // TODO: Be defensive here - cannot parse string to int!
                _userRepository.DeleteUser(Int32.Parse(userid));

                // TODO: Handle responses from Web API
                return "deleted";
            }
            catch (Exception e)
            {
                return "error";
            }
        }

        [System.Web.Http.ActionName("ChangePassword")]
        [System.Web.Http.HttpGet]
        public string ChangePassword(string userid, string newpassword)
        {
            try
            {
                // TODO: Be defensive here - cannot parse string to int!
                _userRepository.ChangePassword(Int32.Parse(userid), newpassword);

                // TODO: Handle responses from Web API
                return "password changed";
            }
            catch (Exception e)
            {
                return "error";
            }
        }
    }
}
