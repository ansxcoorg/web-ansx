"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Unlink,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("ຍັງບໍ່ສາມາດສົ່ງຜ່ານEmailໄດ້ໃນຂະນະນີ້!!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      className: "custom-toast",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChat = () => {
    toast.error("ຍັງບໍ່ພ້ອມໃຊ້ງານໃນຂະນະນີ້!!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      className: "custom-toast",
    });
  };

  const handleMarkerClick = (lat: number, lng: number) => {
    if (!map) return;

    map.setCenter({ lat, lng });
    map.setZoom(15);
  };

  return (
    <div>
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/introl2.911109cb.png"
            alt="Contact Anousith Express"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">{t("contact_us_title")}</h1>
          <p className="max-w-3xl mx-auto">
          {t("contact_us_description")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10">
          <Card className="shadow-md border-none hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("call_us")}</h3>
              <p className="text-gray-600 mb-2">
              {t("call_us_24_7")}
              </p>
              <p className="text-red-600 font-semibold">{t("phone_number")}</p>
              <p className="text-red-600 font-semibold">{t("hotline")}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("email_us")}</h3>
              <p className="text-gray-600 mb-2">{t("response_time")}</p>
              <p className="text-red-600 font-semibold">
              {t("email_address")}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("working_hours")}</h3>
              <p className="text-gray-600 mb-2">{t("working_hours_details")}</p>
              <p className="text-red-600 font-semibold">
              {t("monday_to_friday")}
              </p>
              <p className="text-red-600 font-semibold">{t("saturday")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("send_message_title")}</h2>
            <p className="text-gray-600 mb-8">
            {t("send_message_description")}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("name")} <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder= {t("placeholder_1")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("email")} <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("placeholder_4")}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("phone")}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+856 XX XXX XXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("subject")} <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("placeholder_2")}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t("message")} <span className="text-red-600">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("placeholder_1")}
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
              >
                <Send className="h-4 w-4 mr-2" />
                {t("send_message_button")} 
              </Button>
            </form>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-6">{t("feedback")}</h2>
              <Button
                onClick={() =>
                  (window.location.href = "https://feedback.anousith.express/")
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
              >
                <Unlink className="h-4 w-4 mr-2" />
                {t("feedback")}
              </Button>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-6">{t("register_vehicle")}</h2>
              <Button
                onClick={() =>
                  (window.location.href = "https://partner.anousith.express/")
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
              >
                <Truck className="h-4 w-4 mr-2" />
                {t("register_vehicle")}
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">{t("main_office")}</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
             
                    <GoogleMap
                      id="map"
                      mapContainerStyle={containerStyle}
                      center={{ lat: 17.975601, lng: 102.624856 }}
                      zoom={15}
                      onLoad={(mapInstance) => setMap(mapInstance)}
                    >
                      <Marker
                        position={{ lat: 17.975601, lng: 102.624856 }}
                        onClick={() => handleMarkerClick(17.975601, 102.624856)}
                      />
                    </GoogleMap>
               
                </div>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                {t("main_office")}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                    {t("address")}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{t("phone_number")}</p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{t("hotline")}</p>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{t("email_address")}</p>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">{t("monday_to_friday")}</p>
                      <p className="text-gray-600">{t("saturday")}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h4 className="text-lg font-semibold mb-3">{t("follow_us")}</h4>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.facebook.com/AnousithExpress"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200"
                    >
                      <FaFacebookF className="h-6 w-6" />
                    </Button>
                  </Link>

                  <Link
                    href="https://www.tiktok.com/@ans_express"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200"
                    >
                      <SiTiktok className="h-6 w-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 hover:shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("customer_service_24_7")}</h2>
              <p className="text-gray-600 mb-4">
                {t("text_1")}
              </p>
              <p className="text-gray-600 mb-6">
              {t("text_2")}
              </p>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleChat}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {t("contact_us")}
              </Button>
            </div>
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://storage.googleapis.com/ansx/website/images/94d1b0b1-d671-403c-98fe-d70e9bd52c5d.png"
                alt="Customer Service"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("frequently_asked_questions")}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("faq_description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
              {t("question1")}
              </h3>
              <p className="text-gray-600">
              {t("answer1")}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
              {t("question2")}
              </h3>
              <p className="text-gray-600">
              {t("answer2")}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
              {t("question3")}
              </h3>
              <p className="text-gray-600">
              {t("answer3")}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
              {t("question4")}
              </h3>
              <p className="text-gray-600">
              {t("answer4")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
