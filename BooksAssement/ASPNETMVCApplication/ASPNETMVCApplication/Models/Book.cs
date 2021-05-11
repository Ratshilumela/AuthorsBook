using System;
using System.Web;

namespace ASPNETMVCApplication.Models
{
    public class Book
    {
        public Int64 au_id { get; set; }
        public String au_lname { get; set; }
        public String au_fname { get; set; }
        public Decimal phone { get; set; }
        public String address { get; set; }
        public String city { get; set; }
        public String state { get; set; }
        public String zip { get; set; }
        public String contract { get; set; }

      
    }
}