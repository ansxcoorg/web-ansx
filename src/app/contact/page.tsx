"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);
    alert("ຂອບໃຈສຳລັບຂໍ້ຄວາມຂອງທ່ານ. ພວກເຮົາຈະຕິດຕໍ່ກັບທ່ານໃນໄວໆນີ້.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ext.same-assets.com/3628071284/3519962358.jpeg"
            alt="Contact Anousith Express"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">ຕິດຕໍ່ພວກເຮົາ</h1>
          <p className="max-w-3xl mx-auto">
            ພວກເຮົາພ້ອມຊ່ວຍເຫຼືອທ່ານໃນທຸກໆຄວາມຕ້ອງການດ້ານການຂົນສົ່ງຂອງທ່ານ
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-10">
          <Card className="shadow-md border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">ໂທຫາພວກເຮົາ</h3>
              <p className="text-gray-600 mb-2">ພວກເຮົາພ້ອມໃຫ້ບໍລິການທ່ານ 24/7</p>
              <p className="text-red-600 font-semibold">+856 20 XXXX XXXX</p>
              <p className="text-red-600 font-semibold">+856 20 XXXX XXXX</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">ອີເມລພວກເຮົາ</h3>
              <p className="text-gray-600 mb-2">ຕອບກັບພາຍໃນ 24 ຊົ່ວໂມງ</p>
              <p className="text-red-600 font-semibold">info@anousith.express</p>
              <p className="text-red-600 font-semibold">support@anousith.express</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">ເວລາເຮັດວຽກ</h3>
              <p className="text-gray-600 mb-2">ພວກເຮົາເປີດໃຫ້ບໍລິການທຸກມື້</p>
              <p className="text-red-600 font-semibold">ຈັນ - ສຸກ: 8:00 - 18:00</p>
              <p className="text-red-600 font-semibold">ເສົາ - ອາທິດ: 8:00 - 12:00</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາ</h2>
            <p className="text-gray-600 mb-8">
              ມີຄຳຖາມຫຼືຂໍ້ສະເໜີແນະ? ກະລຸນາຕື່ມຂໍ້ມູນໃສ່ແບບຟອມດ້ານລຸ່ມ ແລະ ທີມງານຂອງພວກເຮົາຈະຕິດຕໍ່ກັບທ່ານໃນໄວໆນີ້.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    ຊື່ ແລະ ນາມສະກຸນ <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ຊື່ເຕັມຂອງທ່ານ"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    ອີເມລ <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    ເບີໂທລະສັບ
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
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    ຫົວຂໍ້ <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="ຫົວຂໍ້ຂອງຂໍ້ຄວາມ"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  ຂໍ້ຄວາມ <span className="text-red-600">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ພິມຂໍ້ຄວາມຂອງທ່ານຢູ່ນີ້..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <Send className="h-4 w-4 mr-2" />
                ສົ່ງຂໍ້ຄວາມ
              </Button>
            </form>
          </div>

          {/* Office Location */}
          <div>
            <h2 className="text-2xl font-bold mb-6">ສຳນັກງານໃຫຍ່ຂອງພວກເຮົາ</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <div className="aspect-video relative">
                {/* This would be a real map in a production environment */}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-red-600" />
                  <span className="ml-2">ແຜນທີ່ສຳນັກງານໃຫຍ່ (ກຳລັງພັດທະນາ)</span>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">ສຳນັກງານໃຫຍ່ - ນະຄອນຫຼວງວຽງຈັນ</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      ບ້ານທາດຫຼວງໃຕ້, ເມືອງຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      +856 20 XXXX XXXX
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">
                      info@anousith.express
                    </p>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600">ຈັນ - ສຸກ: 8:00 - 18:00</p>
                      <p className="text-gray-600">ເສົາ - ອາທິດ: 8:00 - 12:00</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h4 className="text-lg font-semibold mb-3">ຕິດຕາມພວກເຮົາ</h4>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200">
                    <Facebook className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200">
                    <Instagram className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200">
                    <Twitter className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-gray-300 hover:bg-red-50 hover:border-red-200">
                    <Linkedin className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Service */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">ບໍລິການລູກຄ້າ 24/7</h2>
              <p className="text-gray-600 mb-4">
                ພວກເຮົາເຂົ້າໃຈວ່າຄວາມຕ້ອງການດ້ານໂລຈິສຕິກຂອງທ່ານບໍ່ເຄີຍຢຸດ, ແລະ ທີມງານບໍລິການລູກຄ້າຂອງພວກເຮົາກໍເຊັ່ນກັນ.
              </p>
              <p className="text-gray-600 mb-6">
                ພວກເຮົາພ້ອມໃຫ້ບໍລິການທ່ານຕະຫຼອດ 24 ຊົ່ວໂມງ, 7 ວັນຕໍ່ອາທິດ. ບໍ່ວ່າທ່ານຈະຕ້ອງການຕິດຕາມພັດສະດຸ, ມີຄຳຖາມກ່ຽວກັບບໍລິການຂອງພວກເຮົາ, ຫຼື ຕ້ອງການຄວາມຊ່ວຍເຫຼືອໃດໆ, ພວກເຮົາຢູ່ທີ່ນີ້ເພື່ອຊ່ວຍທ່ານ.
              </p>
              <Button className="bg-red-600 hover:bg-red-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                ແຊັດກັບພວກເຮົາດຽວນີ້
              </Button>
            </div>
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://ext.same-assets.com/430996638/2366276010.jpeg"
                alt="Customer Service"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">ຄຳຖາມທີ່ພົບເລື້ອຍ</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ຄຳຕອບສຳລັບຄຳຖາມທີ່ພົບເລື້ອຍຂອງທ່ານກ່ຽວກັບການບໍລິການຂອງພວກເຮົາ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">ພວກເຮົາຈະຕິດຕາມພັດສະດຸຂອງພວກເຮົາໄດ້ແນວໃດ?</h3>
              <p className="text-gray-600">
                ທ່ານສາມາດຕິດຕາມພັດສະດຸໄດ້ຜ່ານເວັບໄຊທ໌ຂອງພວກເຮົາ ຫຼື ແອັບມືຖື ໂດຍການປ້ອນລະຫັດຕິດຕາມຂອງທ່ານ. ນອກຈາກນັ້ນ, ທ່ານຍັງຈະໄດ້ຮັບການແຈ້ງເຕືອນທາງ SMS ຫຼື ອີເມລທຸກຄັ້ງທີ່ມີການອັບເດດສະຖານະພັດສະດຸຂອງທ່ານ.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">COD (ເກັບເງິນປາຍທາງ) ເຮັດວຽກແນວໃດ?</h3>
              <p className="text-gray-600">
                ບໍລິການ COD ຂອງພວກເຮົາຊ່ວຍໃຫ້ທ່ານສາມາດເກັບເງິນຈາກລູກຄ້າຂອງທ່ານໃນເວລາທີ່ພວກເຮົາສົ່ງມອບສິນຄ້າ. ພວກເຮົາຈະໂອນເງິນເຂົ້າບັນຊີຂອງທ່ານພາຍໃນ 1-2 ວັນທຳການ, ມີຄ່າທຳນຽມພຽງ 1,000 ກີບຕໍ່ການຈັດສົ່ງ.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">ເວລາຈັດສົ່ງມາດຕະຖານແມ່ນຈັກມື້?</h3>
              <p className="text-gray-600">
                ເວລາຈັດສົ່ງຂຶ້ນກັບຈຸດໝາຍປາຍທາງ. ໂດຍທົ່ວໄປ, ພາຍໃນນະຄອນຫຼວງວຽງຈັນແມ່ນພາຍໃນ 1 ວັນ, ຕົວເມືອງໃຫຍ່ແມ່ນ 1-2 ວັນ, ແລະ ເຂດຫ່າງໄກສອກຫຼີກແມ່ນ 2-3 ວັນ. ພວກເຮົາຍັງມີບໍລິການຈັດສົ່ງດ່ວນພິເສດສຳລັບການຈັດສົ່ງພາຍໃນມື້ດຽວກັນ ຫຼື ພາຍໃນວັນຖັດໄປ.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">ແມ່ນຫຍັງຄືຂີດຄວາມສາມາດນ້ຳໜັກແລະຂະໜາດສູງສຸດ?</h3>
              <p className="text-gray-600">
                ພວກເຮົາສາມາດຈັດການພັດສະດຸໄດ້ຕັ້ງແຕ່ຖົງຈົດໝາຍນ້ອຍໆ ຈົນຮອດສິນຄ້າຂະໜາດໃຫຍ່ເຊັ່ນເຟີນີເຈີ ແລະ ອຸປະກອນເອເລັກໂຕຣນິກ. ນ້ຳໜັກສູງສຸດຂຶ້ນກັບປະເພດການບໍລິການ, ແຕ່ໂດຍທົ່ວໄປແລ້ວພວກເຮົາສາມາດຈັດການສິນຄ້າທີ່ມີນ້ຳໜັກຫຼາຍກວ່າ 100 ກິໂລກຳ.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
