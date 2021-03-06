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
    public class ProductAPIController : ApiController
    {
        private readonly ProductRepository _productRepository;

        public ProductAPIController()
        {
            _productRepository = new ProductRepository();
        }

        public IEnumerable<Product> GetProducts()
        {
            IEnumerable<Product> products;

            try
            {
                products = _productRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return products;
        }

        [System.Web.Http.ActionName("save")]
        [System.Web.Http.HttpGet]
        public string SaveProduct(string productname,
                                  string productdescription)
        {
            try
            {
                var product = new Product();

                product.ProductName = productname;
                product.ProductDescription = productdescription;
                product.ProductStatus = (int)HelpDeskEnums.Status.Active;
                product.DateCreated = DateTime.Now;

                _productRepository.SaveProduct(product);

                // TODO: Move response message to the constants file
                return "Saved Product - Success";
            }
            catch (Exception e)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
        }

        [System.Web.Http.ActionName("DeleteProduct")]
        [System.Web.Http.HttpGet]
        public string DeleteProduct(string productid)
        {
            try
            {
                // TODO: Be defensive here - cannot parse string to int!
                _productRepository.DeleteProduct(Int32.Parse(productid));

                // TODO: Move response message to the constants file
                return "Deleted Product - Success";
            }
            catch (Exception e)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
        }
    }
}
