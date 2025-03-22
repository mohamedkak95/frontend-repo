import { FaBroadcastTower, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">عروض الاتصالات المصرية</h3>
            <p className="text-neutral-400">
              منصة تجمع كل عروض شركات الاتصالات في مصر في مكان واحد لمساعدتك على اختيار العرض المناسب.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">شركات الاتصالات</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">فودافون مصر</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">أورانج مصر</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">اتصالات مصر</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">المصرية للاتصالات WE</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">الرئيسية</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">باقات الانترنت</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">باقات المكالمات</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">العروض الخاصة</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">اتصل بنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="flex space-x-4 space-x-reverse mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary">
                <FaWhatsapp />
              </a>
            </div>
            <p className="text-neutral-400">اشترك للحصول على آخر العروض</p>
            <form onSubmit={handleSubscribe} className="flex mt-2">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="flex-1 py-2 px-3 rounded-r-lg focus:outline-none text-neutral-900"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-l-lg hover:bg-blue-700">
                اشترك
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 mb-4 md:mb-0">© {new Date().getFullYear()} جميع الحقوق محفوظة - عروض الاتصالات المصرية</p>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-neutral-500 hover:text-white">سياسة الخصوصية</a>
            <a href="#" className="text-neutral-500 hover:text-white">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
