using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
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

        // TODO: Implement endpoint for saving product

        // DELETE api/productapi/5
        [System.Web.Http.HttpDelete]
        public void Delete(int id)
        {
            _productRepository.DeleteProduct(id);
        }
    }
}
