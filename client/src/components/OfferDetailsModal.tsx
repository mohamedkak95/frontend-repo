import { useState } from "react";
import { 
  FaTimes, 
  FaStar, 
  FaCheck, 
  FaInfoCircle, 
  FaShareAlt, 
  FaHeart, 
  FaRegHeart,
  FaYoutube,
  FaMusic,
  FaGlobe,
  FaTicketAlt
} from "react-icons/fa";
import { ExtendedOffer } from "@/types";

interface OfferDetailsModalProps {
  offer: ExtendedOffer;
  onClose: () => void;
}

const OfferDetailsModal = ({ offer, onClose }: OfferDetailsModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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

  return (
    <div 
      className="fixed inset-0 bg-neutral-900/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`relative h-48 ${getBgGradient()}`}>
          <button 
            className="absolute top-4 left-4 h-10 w-10 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30"
            onClick={onClose}
          >
            <FaTimes />
          </button>
          
          <div className="absolute bottom-4 right-4 flex items-center">
            <div className="bg-white p-2 rounded-full shadow-md ml-4">
              {offer.company.logo ? (
                <img src={offer.company.logo} alt={offer.company.nameAr} className="w-12 h-12" />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center">
                  <span className="text-primary font-bold">{offer.company.nameAr.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-white text-3xl font-bold">{offer.title}</h2>
              {offer.rating && (
                <div className="flex items-center text-white/80">
                  <FaStar className="ml-1" />
                  <span>{offer.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{offer.subscribers} مشترك</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Price Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-neutral-700">السعر الشهري</span>
              <div className="flex items-end">
                <span className="text-4xl font-bold text-primary">{offer.price}</span>
                <span className="text-2xl text-neutral-700 mr-1">ج.م</span>
              </div>
              {offer.originalPrice && (
                <div className="text-neutral-700 line-through">كان: {offer.originalPrice} ج.م</div>
              )}
            </div>
            {offer.discount && (
              <div className="bg-accent text-white px-4 py-2 rounded-lg font-bold">
                وفر {offer.discount}%
              </div>
            )}
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-primary">باقة الإنترنت</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-accent ml-2" />
                  <span>{offer.internet.amount} {offer.internet.unit} انترنت</span>
                </li>
                {offer.features?.filter(feature => feature.icon === 'wifi').map(feature => (
                  <li key={feature.id} className="flex items-center">
                    <FaCheck className="text-accent ml-2" />
                    <span>{feature.description}</span>
                  </li>
                ))}
                <li className="flex items-center">
                  <FaInfoCircle className="text-neutral-700 ml-2" />
                  <span className="text-neutral-700">بعد استهلاك الباقة تنخفض السرعة إلى 64 كيلوبت/ثانية</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-primary">باقة المكالمات</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaCheck className="text-accent ml-2" />
                  <span>{offer.minutes.amount} {offer.minutes.description}</span>
                </li>
                {offer.features?.filter(feature => feature.icon === 'phone').map(feature => (
                  <li key={feature.id} className="flex items-center">
                    <FaCheck className="text-accent ml-2" />
                    <span>{feature.description}</span>
                  </li>
                ))}
                <li className="flex items-center">
                  <FaCheck className="text-accent ml-2" />
                  <span>{offer.messages.amount} رسالة SMS مجانية</span>
                </li>
                <li className="flex items-center">
                  <FaInfoCircle className="text-neutral-700 ml-2" />
                  <span className="text-neutral-700">سعر الدقيقة بعد استهلاك الباقة 25 قرش</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Additional Details */}
          {offer.additionalFeatures && offer.additionalFeatures.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-4">مزايا إضافية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offer.additionalFeatures.map(feature => {
                  let icon;
                  switch(feature.icon) {
                    case 'youtube':
                      icon = <FaYoutube className="text-red-600" />;
                      break;
                    case 'music':
                      icon = <FaMusic className="text-purple-600" />;
                      break;
                    case 'globe':
                      icon = <FaGlobe className="text-primary" />;
                      break;
                    case 'ticket':
                      icon = <FaTicketAlt className="text-secondary" />;
                      break;
                    default:
                      icon = <FaCheck className="text-accent" />;
                  }
                  
                  return (
                    <div key={feature.id} className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 ml-3">
                        {icon}
                      </div>
                      <div>
                        <span className="block font-bold">{feature.title}</span>
                        <span className="text-neutral-700">{feature.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Terms and Conditions */}
          {offer.termsAndConditions && offer.termsAndConditions.length > 0 && (
            <div className="bg-neutral-50 p-4 rounded-lg mb-8">
              <h3 className="font-bold text-lg mb-2">الشروط والأحكام</h3>
              <ul className="space-y-1 text-neutral-700 text-sm list-disc pr-5">
                {offer.termsAndConditions.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Call to Action */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <button className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              اشترك الآن
            </button>
            <button className="flex items-center justify-center border border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
              <FaShareAlt className="ml-2" />
              مشاركة العرض
            </button>
            <button 
              className="w-12 h-12 flex items-center justify-center border border-neutral-200 rounded-lg hover:bg-neutral-100"
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

export default OfferDetailsModal;
