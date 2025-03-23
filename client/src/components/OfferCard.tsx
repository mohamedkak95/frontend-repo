import { useState } from "react";
import { 
  FaWifi, 
  FaPhoneAlt, 
  FaCommentAlt, 
  FaHeart, 
  FaRegHeart, 
  FaHourglassHalf, 
  FaTachometerAlt 
} from "react-icons/fa";
import { Offer } from "@/types";

interface OfferCardProps {
  offer: Offer;
  onShowDetails: () => void;
}

const OfferCard = ({ offer, onShowDetails }: OfferCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getIconColor = () => {
    switch(offer.company.id) {
      case 1: // Vodafone
        return "text-primary";
      case 2: // Orange
        return "text-orange-500";
      case 3: // Etisalat
        return "text-green-600";
      case 4: // WE
        return "text-purple-600";
      default:
        return "text-primary";
    }
  };

  const getBgGradient = () => {
    switch(offer.company.id) {
      case 1: // Vodafone
        return "bg-gradient-to-r from-blue-600 to-blue-400";
      case 2: // Orange
        return "bg-gradient-to-r from-orange-600 to-orange-400";
      case 3: // Etisalat
        return "bg-gradient-to-r from-green-600 to-green-400";
      case 4: // WE
        return "bg-gradient-to-r from-purple-600 to-purple-400";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-400";
    }
  };

  const getBgColor = () => {
    switch(offer.company.id) {
      case 1: // Vodafone
        return "bg-blue-100";
      case 2: // Orange
        return "bg-orange-100";
      case 3: // Etisalat
        return "bg-green-100";
      case 4: // WE
        return "bg-purple-100";
      default:
        return "bg-blue-100";
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Header - Company Info */}
      <div className="relative">
        <div className={`h-32 ${getBgGradient()} flex items-center justify-center`}>
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
            {offer.company.logo ? (
                            <img 
                            src={offer.company.logo} 
                            alt={offer.company.nameAr} 
                            className="w-8 h-8 object-contain" 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/images/fallback-logo.svg';
                            }}
                          />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <FaWifi className={getIconColor()} size={20} />
              </div>
            )}
          </div>
          <h3 className="text-white text-2xl font-bold">{offer.title}</h3>
        </div>
        {offer.isLimited && (
          <div className="absolute -bottom-6 left-4 bg-secondary text-white font-bold px-4 py-1 rounded-full">
            عرض لفترة محدودة
          </div>
        )}
        {offer.isPopular && !offer.isLimited && (
          <div className="absolute -bottom-6 left-4 bg-secondary text-white font-bold px-4 py-1 rounded-full">
            الأكثر شهرة
          </div>
        )}
        {offer.tag && !offer.isLimited && !offer.isPopular && (
          <div className="absolute -bottom-6 left-4 bg-secondary text-white font-bold px-4 py-1 rounded-full">
            {offer.tag}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 pt-8">
        {/* Price Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-neutral-700">السعر الشهري</span>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-primary">{offer.price}</span>
              <span className="text-xl text-neutral-700 mr-1">ج.م</span>
            </div>
          </div>
          {offer.discount && (
            <div className="bg-accent/10 text-accent px-3 py-1 rounded-lg">
              وفر {offer.discount}%
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getBgColor()} ml-3`}>
              <FaWifi className={getIconColor()} />
            </div>
            <div>
              <span className="block text-neutral-700">باقة انترنت</span>
              <span className="font-bold">{offer.internet.amount} {offer.internet.unit}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getBgColor()} ml-3`}>
              <FaPhoneAlt className={getIconColor()} />
            </div>
            <div>
              <span className="block text-neutral-700">دقائق اتصال</span>
              <span className="font-bold">{offer.minutes.amount} {offer.minutes.description}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getBgColor()} ml-3`}>
              <FaCommentAlt className={getIconColor()} />
            </div>
            <div>
              <span className="block text-neutral-700">رسائل قصيرة</span>
              <span className="font-bold">{offer.messages.amount} رسالة مجانًا</span>
            </div>
          </div>
        </div>

        {/* Validity & Buttons */}
        <div className="border-t border-neutral-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-neutral-700">مدة صلاحية العرض:</span>
              <span className="font-bold text-neutral-900 mr-1">{offer.validity} يوم</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-700 ml-1">كود العرض:</span>
              <span className="font-bold text-neutral-900">{offer.code}</span>
            </div>
          </div>

          <div className="flex space-x-2 space-x-reverse">
            <button 
              className="flex-1 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={onShowDetails}
            >
              تفاصيل العرض
            </button>
            <button 
              className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-lg hover:bg-neutral-100"
              onClick={toggleFavorite}
            >
              {isFavorite ? (
                <FaHeart className="text-secondary" />
              ) : (
                <FaRegHeart className="text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
