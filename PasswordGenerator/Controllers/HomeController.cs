using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

namespace PasswordGenerator.Controllers
{
    public class HomeController : Controller
    {
        private static Random random = new Random();

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public string GeneratePassword(int Length, bool Numbers, int Letters, bool Special)
        {
            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var numbers = "0123456789";
            var special = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
            var chars = "";

            if (Numbers)
                chars += numbers;
            if (Special)
                chars += special;

            chars += Letters == 1 ? letters : Letters == 2 ? letters.ToLower() : letters + letters.ToLower();

            return new string(Enumerable.Repeat(chars, Length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}
