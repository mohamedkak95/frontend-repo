import { Package } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

interface PackageDetailsModalProps {
  pkg: Package | null;
  onClose: () => void;
}

const PackageDetailsModal = ({ pkg, onClose }: PackageDetailsModalProps) => {
  if (!pkg) return null;

  // Function to render features as a list
  const renderFeatures = () => {
    const features = pkg.features;
    return (
      <ul className="space-y-2 text-right">
        {Object.entries(features).map(([key, value]) => (
          <li key={key} className="flex items-center justify-end gap-2">
            <span>{value}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Dialog open={!!pkg} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[80vh]" dir="rtl">
        <DialogHeader className="text-right">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">{pkg.name}</DialogTitle>
            <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center border border-neutral-200 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          <div className="flex gap-2 mt-2">
            {pkg.isPopular && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">شائع</span>
            )}
            {pkg.isNew && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">جديد</span>
            )}
            {pkg.isSpecial && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">خاص</span>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1">
            <img 
              src={pkg.imageUrl} 
              alt={pkg.name} 
              className="w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                // If image fails to load, replace with provider name
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23333" text-anchor="middle" dominant-baseline="middle">' + pkg.provider + '</text></svg>';
              }}
            />
            <div className="mt-4 bg-white rounded-lg shadow p-4 border border-neutral-200">
              
              <div className="text-sm text-center text-gray-500 mt-1">
                صالح لمدة {pkg.validity}
              </div>
              <div className="mt-4">
                <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">تفاصيل الباقة</TabsTrigger>
                <TabsTrigger value="features" className="flex-1">المميزات</TabsTrigger>
                <TabsTrigger value="howto" className="flex-1">كيفية الاشتراك</TabsTrigger>
                <TabsTrigger value="terms" className="flex-1">الشروط والأحكام</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-4 border rounded-md mt-2 text-right">
                <h3 className="font-semibold text-lg mb-2">وصف الباقة</h3>
                <p className="text-neutral-700 whitespace-pre-line">{pkg.description}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">المزود</h4>
                  <p>{pkg.provider}</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">نوع الباقة</h4>
                  <p>{pkg.type}</p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="p-4 border rounded-md mt-2">
                <h3 className="font-semibold text-lg mb-4 text-right">مميزات الباقة</h3>
                {renderFeatures()}
              </TabsContent>
              <TabsContent value="howto" className="p-4 border rounded-md mt-2 text-right">
                <h3 className="font-semibold text-lg mb-2">كيفية الاشتراك</h3>
                <p className="text-neutral-700 whitespace-pre-line">{pkg.howToSubscribe}</p>
              </TabsContent>
              <TabsContent value="terms" className="p-4 border rounded-md mt-2 text-right">
                <h3 className="font-semibold text-lg mb-2">الشروط والأحكام</h3>
                <p className="text-neutral-700 whitespace-pre-line">{pkg.terms}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetailsModal;