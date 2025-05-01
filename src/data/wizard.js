import { step1Schema , step2Schema,  step3Schema } from "@/lib/validations";

export const steps = [
    {
        "name": null,
        "validate": step1Schema,
        "questions": [
            {
                "question": "What is your name?",
                "type": "text",
                "key": "name",
                "errorMessage": "Please enter a valid name",
                "placeholder": "Enter your name"
            },
            {
                "question": "What is your email?",
                "type": "email",
                "key": "email",
                "errorMessage": "Please enter a valid email address",
                "placeholder": "Enter your email"
            },
            {
                "question": "What is your phone number?",
                "type": "tel",
                "key": "phone",
                "errorMessage": "Please enter a valid phone number",
                "placeholder": "(5--) --- ----"
            },
            {
                "question": "What is your date of birth?",
                "type": "date",
                "key": "birthDate",
                "errorMessage": "Please enter a valid date",
                "placeholder": "gg.aa.yyyy"
            },
            {
                "question": "Select the city you live in",
                "type": "select",
                "key": "city",
                "placeholder": "Select an option",  
                "options": [
                  { "value": "Adana", "label": "Adana" },
                  { "value": "Adıyaman", "label": "Adıyaman" },
                  { "value": "Afyonkarahisar", "label": "Afyonkarahisar" },
                  { "value": "Ağrı", "label": "Ağrı" },
                  { "value": "Amasya", "label": "Amasya" },
                  { "value": "Ankara", "label": "Ankara" },
                  { "value": "Antalya", "label": "Antalya" },
                  { "value": "Artvin", "label": "Artvin" },
                  { "value": "Aydın", "label": "Aydın" },
                  { "value": "Balıkesir", "label": "Balıkesir" },
                  { "value": "Bilecik", "label": "Bilecik" },
                  { "value": "Bingöl", "label": "Bingöl" },
                  { "value": "Bitlis", "label": "Bitlis" },
                  { "value": "Bolu", "label": "Bolu" },
                  { "value": "Burdur", "label": "Burdur" },
                  { "value": "Bursa", "label": "Bursa" },
                  { "value": "Çanakkale", "label": "Çanakkale" },
                  { "value": "Çankırı", "label": "Çankırı" },
                  { "value": "Çorum", "label": "Çorum" },
                  { "value": "Denizli", "label": "Denizli" },
                  { "value": "Diyarbakır", "label": "Diyarbakır" },
                  { "value": "Edirne", "label": "Edirne" },
                  { "value": "Elazığ", "label": "Elazığ" },
                  { "value": "Erzincan", "label": "Erzincan" },
                  { "value": "Erzurum", "label": "Erzurum" },
                  { "value": "Eskişehir", "label": "Eskişehir" },
                  { "value": "Gaziantep", "label": "Gaziantep" },
                  { "value": "Giresun", "label": "Giresun" },
                  { "value": "Gümüşhane", "label": "Gümüşhane" },
                  { "value": "Hakkâri", "label": "Hakkâri" },
                  { "value": "Hatay", "label": "Hatay" },
                  { "value": "Isparta", "label": "Isparta" },
                  { "value": "Mersin", "label": "Mersin" },
                  { "value": "İstanbul", "label": "İstanbul" },
                  { "value": "İzmir", "label": "İzmir" },
                  { "value": "Kars", "label": "Kars" },
                  { "value": "Kastamonu", "label": "Kastamonu" },
                  { "value": "Kayseri", "label": "Kayseri" },
                  { "value": "Kırklareli", "label": "Kırklareli" },
                  { "value": "Kırşehir", "label": "Kırşehir" },
                  { "value": "Kocaeli", "label": "Kocaeli" },
                  { "value": "Konya", "label": "Konya" },
                  { "value": "Kütahya", "label": "Kütahya" },
                  { "value": "Malatya", "label": "Malatya" },
                  { "value": "Manisa", "label": "Manisa" },
                  { "value": "Kahramanmaraş", "label": "Kahramanmaraş" },
                  { "value": "Mardin", "label": "Mardin" },
                  { "value": "Muğla", "label": "Muğla" },
                  { "value": "Muş", "label": "Muş" },
                  { "value": "Nevşehir", "label": "Nevşehir" },
                  { "value": "Niğde", "label": "Niğde" },
                  { "value": "Ordu", "label": "Ordu" },
                  { "value": "Rize", "label": "Rize" },
                  { "value": "Sakarya", "label": "Sakarya" },
                  { "value": "Samsun", "label": "Samsun" },
                  { "value": "Siirt", "label": "Siirt" },
                  { "value": "Sinop", "label": "Sinop" },
                  { "value": "Sivas", "label": "Sivas" },
                  { "value": "Tekirdağ", "label": "Tekirdağ" },
                  { "value": "Tokat", "label": "Tokat" },
                  { "value": "Trabzon", "label": "Trabzon" },
                  { "value": "Tunceli", "label": "Tunceli" },
                  { "value": "Şanlıurfa", "label": "Şanlıurfa" },
                  { "value": "Uşak", "label": "Uşak" },
                  { "value": "Van", "label": "Van" },
                  { "value": "Yozgat", "label": "Yozgat" },
                  { "value": "Zonguldak", "label": "Zonguldak" },
                  { "value": "Aksaray", "label": "Aksaray" },
                  { "value": "Bayburt", "label": "Bayburt" },
                  { "value": "Karaman", "label": "Karaman" },
                  { "value": "Kırıkkale", "label": "Kırıkkale" },
                  { "value": "Batman", "label": "Batman" },
                  { "value": "Şırnak", "label": "Şırnak" },
                  { "value": "Bartın", "label": "Bartın" },
                  { "value": "Ardahan", "label": "Ardahan" },
                  { "value": "Iğdır", "label": "Iğdır" },
                  { "value": "Yalova", "label": "Yalova" },
                  { "value": "Karabük", "label": "Karabük" },
                  { "value": "Kilis", "label": "Kilis" },
                  { "value": "Osmaniye", "label": "Osmaniye" },
                  { "value": "Düzce", "label": "Düzce" }
                ],
                "errorMessage": "Please select an option",
              }
           
        ]
    },
    {
        "name": null,
        "validate": step2Schema,
        "questions": [
            {
                "question": "Your LinkedIn Profile",
                "type": "text",
                "key": "link",
                "errorMessage": "Please enter a valid name",
                "placeholder": "Your LinkedIn profile (if any)"
            },
            {
                "question": "Your Preferred Way of Communication",
                "type": "multiSelect",
                "key": "acceptance",
                "placeholder": "Select an option",   
                "options": [
                    {
                        "value": "email",
                        "label": "E-posta"
                    },
                    {
                        "value": "tel",
                        "label": "Telefon"
                    },
                    {
                        "value": "whatsapp",
                        "label": "Whatsapp"
                    }
                ],
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
            {
                "question": "What is your education status?",
                "type": "select",
                "key": "educationStatus",
                "placeholder": "Select an option",   
                "required": true,
                "options": [
                    { "value": "universite-ogrencisi", "label": "Üniversite Öğrencisi" },
                    { "value": "mezun", "label": "Mezun" },
                    { "value": "yuksek-lisans-ogrencisi", "label": "Yüksek Lisans Öğrencisi" },
                    { "value": "lise-mezunu", "label": "Lise Mezunu" }
                  ],
                  
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
            {
                "question": "What is the training you want to apply for?",
                "type": "select",
                "key": "courseSelection",
                "placeholder": "Select an option",   
                "required": true,
                "options": [
                    { "value": "yazilim-gelistirme-araclari", "label": "Yazılım Geliştirme Araçları Eğitimi" },
                    { "value": "yazilim-temelleri", "label": "Yazılım Temelleri Eğitimi" },
                    { "value": "csharp-giris", "label": "C# ile Programlamaya Giriş Eğitimi" },
                    { "value": "python-giris", "label": "Python ile Programlamaya Giriş Eğitimi" },
                    { "value": "dotnet-core-giris", "label": "C# ve .Net Core İle Programlamaya Giriş Eğitimi" },
                    { "value": "csharp-backend", "label": "C# ile Back-End Eğitimi" },
                    { "value": "csharp-gelistirme", "label": "C# ile Yazılım Geliştirme Eğitimi" },
                    { "value": "vuejs-temelleri", "label": "Vue.js Temelleri Eğitimi" },
                    { "value": "typescript-nextjs", "label": "TypeScript & Next.js Full Stack Geliştirme Eğitimi" },
                    { "value": "dotnet-angular", "label": ".NET Angular Full Stack Geliştirme Eğitimi" },
                    { "value": "java-angular", "label": "Java Spring Boot & Angular Full Stack Geliştirme Eğitimi" },
                    { "value": "dotnet-react", "label": ".NET & React Full Stack Geliştirme Eğitimi" },
                    { "value": "java-react", "label": "Java Spring Boot & React Full Stack Geliştirme Eğitimi" },
                    { "value": "unity-oyun", "label": "Unity ile Oyun Geliştirme Eğitimi" },
                    { "value": "cursor-lowcode", "label": "Cursor ile Low-Code Web Uygulama Geliştirme Eğitimi" },
                    { "value": "devops-temelleri", "label": "DevOps Temelleri Eğitimi" },
                    { "value": "yeni-medya-ai", "label": "Yeni Medya & Yapay Zeka Eğitimi" },
                    { "value": "pro-ai-uzmanligi", "label": "Profesyonel Yapay Zeka Uzmanlığı Eğitimi" },
                    { "value": "makine-ogrenmesi", "label": "Makine Öğrenmesi Eğitimi" },
                    { "value": "python-veri-bilimi", "label": "Python ile Veri Bilimi Eğitimi" },
                    { "value": "ai-kodlama", "label": "Yapay Zeka ile Kodlama Eğitimi" },
                    { "value": "ai-icin-python", "label": "Yapay Zeka için Python Eğitimi" },
                    { "value": "akademik-ai-araclari", "label": "İş ve Akademik Hayatta Yapay Zeka Araçları Eğitimi" },
                    { "value": "ai-agent-mastery", "label": "Makine Öğrenmesi ve AI Agent Mastery Eğitimi" },
                    { "value": "siber-guvenlik", "label": "Siber Güvenlik Uzmanlığı Eğitimi" },
                    { "value": "ag-guvenligi", "label": "Ağ Güvenliği (Network Security) Uzmanlığı Eğitimi" },
                    { "value": "dijital-reklam", "label": "Dijital Reklamcılık Eğitimi" },
                    { "value": "video-kurgu", "label": "Dijital Video Kurgu Eğitimi" },
                    { "value": "animasyon-3d", "label": "3D Animasyon Eğitimi" },
                    { "value": "sosyalmedya-canva", "label": "Sosyal Medya ve Canva Eğitimi" },
                    { "value": "proje-yonetimi", "label": "Proje Yönetimi Eğitimi" },
                    { "value": "blockchain", "label": "Blockchain Teknolojisi Eğitimi" },
                    { "value": "dizi-film-atolyesi", "label": "Dizi ve Film Proje Atölyesi Eğitimi" }
                  ],
                  
                  
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
          
        ]
    },
    {
        "name": null,
        "validate": step3Schema,
        "questions": [
            {
                "question": "Your Biggest Expectation from AkademiQ",
                "type": "multiSelect",
                "key": "expectations",
                "placeholder": "Select an option",   
                "required": true,
                "options": [
                    { "value": "alan-degistirmek", "label": "Alan Değiştirmek" },
                    { "value": "alanda-uzmanlasma", "label": "Alanda Uzmanlaşmak" },
                    { "value": "sertifika-almak", "label": "Sertifika Almak" },
                    { "value": "network-edinmek", "label": "Network Edinmek" },
                    { "value": "is-bulmak", "label": "İş Bulmak" },
                    { "value": "hepsi", "label": "Hepsi" },

                  ],
                  
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
            {
                "question": "Your Career Goal",
                "type": "multiSelect",
                "key": "career",
                "placeholder": "Select an option",   
                "required": true,
                "options": [
                    { "value": "freelance", "label": "Freelance" },
                    { "value": "kurumsal-pozisyon", "label": "Kurumsal Pozisyon" },
                    { "value": "kendi-isini-kurmak", "label": "Kendi İşini Kurmak" },
                    { "value": "yurt-disi-is", "label": "Yurt Dışı İş" },
                  ],
                  
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
            {
                "question": "Is certification or competence important to you?",
                "type": "select",
                "key": "certificateCompetency",
                "placeholder": "Select an option",   
                "required": true,
                "options": [
                    { "value": "sertifika", "label": "Sertifika" },
                    { "value": "yetkinlik", "label": "Yetkinlik" },
                    { "value": "karasizim", "label": "Karasızım" },
                  ],
                  
                "errorMessage": "Please select an option",
                "placeholder": "Select an option"
            },
            
              
        ]
    }
]