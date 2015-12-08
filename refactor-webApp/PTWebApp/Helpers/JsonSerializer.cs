using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml.Serialization;

namespace PTWebApp.Helpers
{
    public static class JsonSerializer
    {

        public static string JsonSerializeToString(this object objectInstance)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objectInstance);
        }

        public static T JsonDeserializeFromString<T>(this string objectInstance) where T : new()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return (T)serializer.Deserialize<T>(objectInstance);
        }
    }

}