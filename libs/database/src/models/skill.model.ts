import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'skill',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Skill extends Model {
  @Column({
    type: new DataTypes.STRING(128),
  })
  public he: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public ar: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public ru: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public en: string;
}
// setTimeout(() => {
//   Skill.sync({ force: false });
//   const arr = [
//     {
//       en: 'Sales Representative',
//       ru: 'Представитель по продажам',
//       ar: 'ممثل مبيعات',
//       he: 'נציג/ת מכירות בחנות',
//     },
//     {
//       en: 'Prep Cook',
//       ru: 'Помощник повара',
//       ar: 'طباخ تحضيري',
//       he: 'טבח/ית הכנות',
//     },
//     {
//       en: 'Digital Marketing',
//       ru: 'Цифровой маркетинг',
//       ar: 'التسويق الرقمي',
//       he: 'שיווק דיגיטלי',
//     },
//     {
//       en: 'Software Development',
//       ru: 'Разработка программного обеспечения',
//       ar: 'تطوير البرمجيات',
//       he: 'פיתוח תוכנה',
//     },
//     {
//       en: 'Project Management',
//       ru: 'Разработка программного обеспечения',
//       ar: 'تطوير البرمجيات',
//       he: 'ניהול פרויקטים',
//     },
//     {
//       en: 'Bookkeeping',
//       ru: ' Бухгалтерский учет',
//       ar: 'الحفظ الدفاتر',
//       he: 'הנהלת חשבונות',
//     },
//     {
//       en: ' Event Planning',
//       ru: ' Организация мероприятий',
//       ar: 'تخطيط الفعاليات',
//       he: 'תכנון אירועים',
//     },
//     {
//       en: 'Video Production',
//       ru: 'Видеопродакшн',
//       ar: ' إنتاج الفيديو',
//       he: 'הפקת וידאו',
//     },
//     {
//       en: 'Video Editing',
//       ru: 'Монтаж видео',
//       ar: 'تحرير الفيديو',
//       he: 'עריכת וידאו',
//     },
//     {
//       en: 'Animation',
//       ru: ' Анимация',
//       ar: ' الرسوم المتحركة',
//       he: 'אנימציה',
//     },
//     {
//       en: 'Photography',
//       ru: ' Фотография',
//       ar: 'التصوير الفوتوغرافي',
//       he: 'צילום',
//     },
//     {
//       en: 'Photo Editing',
//       ru: ' Редактирование фотографий',
//       ar: 'تحرير الصور',
//       he: 'עריכת תמונות',
//     },
//     {
//       en: 'Catering Staff',
//       ru: 'Работник кейтеринга',
//       ar: ' طاقم التموين',
//       he: 'עובד/ת קייטרינג',
//     },
//     {
//       en: 'Translator',
//       ru: 'Переводчик',
//       ar: ' مترجم',
//       he: 'מתורגמן/ית',
//     },
//     {
//       en: ' Transcription',
//       ru: 'Транскрипция',
//       ar: ' تفريغ نصي',
//       he: 'תמלול',
//     },
//     {
//       en: 'IT Support',
//       ru: 'IT поддержка',
//       ar: ' دعم تقنية المعلومات',
//       he: 'תמיכת IT',
//     },
//     {
//       en: 'Cybersecurity',
//       ru: 'Кибербезопасность',
//       ar: 'الأمن السيبراني',
//       he: 'אבטחת סייבר',
//     },
//     {
//       en: 'Cloud Computing',
//       ru: ' Облачные вычисления',
//       ar: ' الحوسبة السحابية',
//       he: 'מחשוב ענן',
//     },
//     {
//       en: 'UX/UI Design',
//       ru: 'Дизайн UX/UI',
//       ar: 'تصميم UX/UI',
//       he: 'עיצוב UX/UI',
//     },
//     {
//       en: ' Public Relations',
//       ru: 'Связи с общественностью',
//       ar: 'العلاقات العامة',
//       he: 'יחסי ציבור',
//     },
//     {
//       en: 'Brand Strategy',
//       ru: 'Стратегия бренда',
//       ar: 'استراتيجية العلامة التجارية',
//       he: 'אסטרטגיית מותג',
//     },
//     {
//       en: 'Market Research',
//       ru: 'Исследование рынка',
//       ar: 'بحوث السوق',
//       he: 'מחקר שוק',
//     },
//     {
//       en: 'Bookkeeping',
//       ru: 'Бухгалтерский учет',
//       ar: 'الحفظ الدفاتر',
//       he: 'ניהול ספרים',
//     },
//     {
//       en: 'Food Delivery Driver',
//       ru: 'Водитель доставки еды',
//       ar: 'سائق توصيل الطعام',
//       he: 'נהג/ת משלוחי מזון',
//     },
//     {
//       en: 'Legal Consulting',
//       ru: ' Юридическая консультация',
//       ar: 'الاستشارات القانونية',
//       he: 'ייעוץ משפטי',
//     },
//     {
//       en: 'Team Management',
//       ru: 'Управление командой',
//       ar: 'إدارة الفريق',
//       he: 'ניהול צוות',
//     },
//     {
//       en: 'Logistics Management',
//       ru: ' Управление логистикой',
//       ar: 'إدارة اللوجستيات',
//       he: 'ניהול לוגיסטיקה',
//     },
//     {
//       en: ' Procurement Officer',
//       ru: 'Специалист по закупкам',
//       ar: 'مسؤول المشتريات',
//       he: 'קניין/ית מצרכים',
//     },
//     {
//       en: 'Hotel Housekeeping Staff',
//       ru: ': Сотрудник службы уборки в отеле',
//       ar: 'طاقم التنظيف بالفندق',
//       he: 'עובד/ת ניקיון במלון',
//     },
//     {
//       en: 'Room Attendant',
//       ru: ' Горничная',
//       ar: 'مساعد الغرف',
//       he: '(מסדר/ת חדרים (חדרן/ית',
//     },
//     {
//       en: 'Receptionist',
//       ru: 'Рецепционист',
//       ar: 'موظف استقبال',
//       he: 'פקיד/ת קבלה',
//     },
//     {
//       en: 'Tour Guide',
//       ru: ': Гид',
//       ar: 'مرشد سياحي',
//       he: 'מדריך/ת טיולים',
//     },
//     {
//       en: ' Fitness Instructor',
//       ru: 'Инструктор по фитнесу',
//       ar: 'مدرب لياقة بدنية',
//       he: 'מדריך/ת כושר',
//     },
//     {
//       en: 'Yoga Instructor',
//       ru: ' Инструктор по йоге',
//       ar: 'مدرب يوغا',
//       he: 'מדריך/ת יוגה',
//     },
//     {
//       en: 'Restaurant Waiter/Waitress',
//       ru: 'Официант/Официантка',
//       ar: 'نادل/نادلة في مطعم',
//       he: 'מלצר/ית במסעדה',
//     },
//     {
//       en: ' Personal Trainer',
//       ru: ' Личный тренер',
//       ar: 'مدرب شخصي',
//       he: 'מאמן/ת אישי/ת',
//     },
//     {
//       en: 'Security Guard',
//       ru: 'Охранник',
//       ar: ': حارس أمن',
//       he: 'מאבטח/ת',
//     },
//     {
//       en: 'Maintenance Worker',
//       ru: ': Работник по техническому обслуживанию',
//       ar: 'عامل صيانة',
//       he: 'עובד/ת תחזוקה',
//     },
//     {
//       en: 'Cleaning Assistant',
//       ru: 'Помощник по уборке',
//       ar: ' مساعد تنظيف',
//       he: 'עוזר/ת ניקיון',
//     },
//     {
//       en: 'Gardener',
//       ru: 'Садовник',
//       ar: 'بستاني',
//       he: 'גנן/ית',
//     },
//     {
//       en: 'Florist',
//       ru: 'Флорист',
//       ar: 'منسق زهور',
//       he: 'שוזר/ית (פרחים)',
//     },
//     {
//       en: 'Construction Worker',
//       ru: ' Строитель',
//       ar: 'عامل بناء',
//       he: 'פועל/ת בניין',
//     },
//     {
//       en: ' General Laborer',
//       ru: 'Рабочий',
//       ar: 'عامل عام',
//       he: 'עובד/ת כללי/ת',
//     },
//     {
//       en: 'Painter',
//       ru: 'Маляр',
//       ar: ' دهان',
//       he: 'צבע/ית',
//     },
//     {
//       en: 'Electrician',
//       ru: 'Электрик',
//       ar: ' كهربائي',
//       he: 'חשמלאי/ת',
//     },
//     {
//       en: 'Barista',
//       ru: 'Бариста',
//       ar: 'باريستا',
//       he: 'בריסטה (מכין/ת קפה)',
//     },
//     {
//       en: 'Plumber',
//       ru: 'Сантехник',
//       ar: 'سباك',
//       he: 'שרברב/ית',
//     },
//     {
//       en: 'HVAC Technician',
//       ru: ' Техник по кондиционированию воздуха',
//       ar: 'فني تكييف وتبريد',
//       he: 'טכנאי/ת מיזוג אוויר',
//     },
//     {
//       en: 'Carpenter',
//       ru: ' Плотник',
//       ar: ' نجار',
//       he: 'נגר/ית',
//     },
//     {
//       en: 'Bricklayer',
//       ru: 'Каменщик',
//       ar: 'مبلط',
//       he: 'בנאי/ת',
//     },
//     {
//       en: 'Roofer',
//       ru: 'Кровельщик',
//       ar: 'عامل تركيب أسقف',
//       he: 'גגן/ית',
//     },
//     {
//       en: 'Tiler',
//       ru: 'Плиточник',
//       ar: ' مركب بلاط',
//       he: 'רצף/ת',
//     },
//     {
//       en: 'Window Cleaner',
//       ru: 'Мойщик окон',
//       ar: 'عامل تنظيف نوافذ',
//       he: 'מנקה חלונות',
//     },
//     {
//       en: ' Pool Cleaner',
//       ru: 'Уборщик бассейнов',
//       ar: ' عامل تنظيف حمامات السباحة',
//       he: 'מנקה בריכות',
//     },
//     {
//       en: 'Moving Assistant',
//       ru: 'Помощник по переездам',
//       ar: 'مساعد نقل',
//       he: 'עוזר/ת הובלות',
//     },
//     {
//       en: ' Warehouse Worker',
//       ru: 'Складской работник',
//       ar: 'عامل مستودع',
//       he: 'עובד/ת מחסן',
//     },
//     {
//       en: 'Bartender',
//       ru: ' Бармен',
//       he: 'ברמן/ית',
//       arabahe: 'نادل البار',
//     },
//     {
//       en: 'Production Line Worker',
//       ru: 'Работник на производственной линии',
//       ar: 'عامل خط إنتاج',
//       he: 'עובד/ת בפס ייצור',
//     },
//     {
//       en: 'Forklift Operator',
//       ru: 'Оператор погрузчика',
//       ar: 'مشغل رافعة شوكية',
//       he: 'מפעיל/ת מלגזה',
//     },
//     {
//       en: ' Garbage Collector',
//       ru: 'Мусорщик',
//       ar: 'جامع القمامة',
//       he: 'אוסף/ת אשפה',
//     },
//     {
//       en: 'Recycling Worker',
//       ru: ' Работник по переработке',
//       ar: 'عامل إعادة تدوير',
//       he: 'עובד/ת מיחזור',
//     },
//     {
//       en: 'Street Cleaner',
//       ru: 'Уборщик улиц',
//       ar: 'عامل نظافة الشوارع',
//       he: 'מנקה רחובות',
//     },
//     {
//       en: ' Snow Removal Worker',
//       ru: 'Работник по уборке снега',
//       ar: 'عامل إزالة الثلج',
//       he: 'עובד/ת פינוי שלג',
//     },
//     {
//       en: ' Pet Sitter',
//       ru: ' Няня для животных',
//       ar: 'جليس الحيوانات الأليفة',
//       he: 'שמרטף/ית לחיות מחמד',
//     },
//     {
//       en: 'Dog Walker',
//       ru: ' Выгульщик собак',
//       ar: 'مربي كلاب',
//       he: 'דוג ווקר/ית',
//     },
//     {
//       en: ' Pet Caretaker',
//       ru: ' Ухаживающий за домашними животными',
//       ar: 'مقدم العناية بالحيوانات الأليفة',
//       he: 'מטפל/ת בחיות מחמד',
//     },
//     {
//       en: 'Veterinary Assistant',
//       ru: ' Ассистент ветеринара',
//       ar: ' مساعد بيطري',
//       he: 'עוזר/ת וטרינר',
//     },
//     {
//       en: ' Event Staff',
//       ru: 'Работник мероприятий',
//       ar: ' طاقم الفعاليات',
//       he: 'עובד/ת אירועים',
//     },
//     {
//       en: ' Animal Shelter Worker',
//       ru: 'Работник приюта для животных',
//       ar: ' عامل في مأوى الحيوانات',
//       he: 'עובד/ת במקלט לבע"ח',
//     },
//     {
//       en: 'Babysitter',
//       ru: 'Няня',
//       ar: 'جليسة أطفال',
//       he: 'שמרטף/ית',
//     },
//     {
//       en: ' Child Caregiver',
//       ru: 'Опекун для детей',
//       ar: 'مقدم رعاية الأطفال',
//       he: 'מטפל/ת לילדים',
//     },
//     {
//       en: 'Daycare Worker',
//       ru: 'Работник детского сада',
//       ar: 'عامل في دار الحضانة',
//       he: 'עובד/ת במעון יום',
//     },
//     {
//       en: ' Elderly Caregiver',
//       ru: 'Сиделка для пожилых',
//       ar: 'مقدم رعاية المسنين',
//       he: 'מטפל/ת בקשישים',
//     },
//     {
//       en: 'Home Health Aide',
//       ru: 'Домашний медработник',
//       ar: ' مساعد صحي منزلي',
//       he: 'מטפל/ת סיעודי/ת ביתי/ת',
//     },
//     {
//       en: 'Nurse Assistant',
//       ru: 'Медицинский ассистент',
//       he: 'עוזר/ת אחות',
//       arabahe: ' مساعد تمريض',
//     },
//     {
//       en: ' Personal Care Attendant',
//       ru: ' Личный помощник по уходу',
//       ar: 'معاون العناية الشخصية',
//       he: 'מטפל/ת אישי/ת',
//     },
//     {
//       en: ' Tailor',
//       ru: ' Портной',
//       ar: 'خياط',
//       he: 'תופר/ת',
//     },
//     {
//       en: 'Cobbler',
//       ru: 'Сапожник',
//       ar: 'صانع الأحذية',
//       he: 'סנדלר/ית',
//     },
//     {
//       en: 'Host/Hostess',
//       ru: 'Хостес',
//       ar: 'مضيف/مضيفة',
//       he: 'מארח/ת',
//     },
//     {
//       en: ' Upholsterer',
//       ru: 'Обивщик мебели',
//       ar: ' مفروشات',
//       he: 'רפד/ת',
//     },
//     {
//       en: 'Furniture Assembler',
//       ru: 'Сборщик мебели',
//       ar: 'مجمع الأثاث',
//       he: 'מרכיב/ת רהיטים',
//     },
//     {
//       en: 'Appliance Technician',
//       ru: ' Техник по бытовой технике',
//       ar: 'فني الأجهزة المنزلية',
//       he: 'טכנאי/ת מכשירי חשמל',
//     },
//     {
//       en: 'Bicycle Repair Technician',
//       ru: ' Механик по ремонту велосипедов',
//       ar: ' فني تصليح دراجات',
//       he: 'טכנאי/ת תיקון אופניים',
//     },
//     {
//       en: ' Auto Mechanic',
//       ru: 'Автомеханик',
//       ar: ' ميكانيكي سيارات',
//       he: 'מכונאי/ת רכב',
//     },
//     {
//       en: 'Tire Technician',
//       ru: 'Шиномонтажник',
//       ar: 'فني إطارات',
//       he: 'טכנאי/ת צמיגים',
//     },
//     {
//       en: 'Car Wash Attendant',
//       ru: ' Работник автомойки',
//       ar: 'عامل في مغسلة سيارات',
//       he: 'עובד/ת שטיפת רכב',
//     },
//     {
//       en: 'Shuttle Driver',
//       ru: 'Водитель шаттла',
//       ar: 'سائق نقل',
//       he: 'נהג/ת הסעות',
//     },
//     {
//       en: 'Street Artist',
//       ru: ' Уличный художник',
//       ar: 'فنان شارع',
//       he: 'אמן/ית רחוב',
//     },
//     {
//       en: 'Event Photographer',
//       ru: ' Фотограф на мероприятиях',
//       ar: 'مصور فعاليات',
//       he: 'צלם/ת אירועים',
//     },
//     {
//       en: ' Dishwasher',
//       ru: 'Мойщик посуды',
//       ar: 'غاسل الصحون',
//       he: 'שוטף/ת כלים',
//     },
//     {
//       en: 'Wedding Photographer',
//       ru: 'Свадебный фотограф',
//       ar: 'مصور زفاف',
//       he: 'צלם/ת חתונות',
//     },
//     {
//       en: 'Event Producer',
//       ru: 'Продюсер мероприятий',
//       ar: ' منتج فعاليات',
//       he: 'מפיק/ת אירועים',
//     },
//     {
//       en: ' Party Planner',
//       ru: 'Организатор вечеринок',
//       ar: 'منظم حفلات',
//       he: 'מפיק/ת מסיבות',
//     },
//     {
//       en: ' DJ (Disc Jockey)',
//       ru: 'Диджей',
//       ar: ' دي جي',
//       he: 'תקליטן/ית',
//     },
//     {
//       en: ' Sound Technician',
//       ru: 'Звукорежиссер',
//       ar: 'فني صوت',
//       he: 'טכנאי/ת סאונד',
//     },
//     {
//       en: 'Stage Crew',
//       ru: ' Работник сцены',
//       ar: 'طاقم المسرح',
//       he: 'עובד/ת במה',
//     },
//     { he: 'מאפר/ת' },
//     {
//       en: ' Hair Stylist',
//       ru: ' Парикмахер',
//       ar: 'مصفف شعر',
//       he: 'מעצב/ת שיער',
//     },
//     {
//       en: 'Nail Technician',
//       ru: 'Мастер по маникюру',
//       ar: ' فني أظافر',
//       he: 'טכנאי/ת ציפורניים',
//     },
//     {
//       en: 'Cosmetologist',
//       ru: 'Косметолог',
//       ar: '',
//       he: 'קוסמטיקאי/ת',
//     },
//     {
//       en: 'Chef',
//       ru: 'Повар',
//       ar: 'طاه',
//       he: 'טבח/ית',
//     },
//     {
//       en: 'Tattoo Artist',
//       ru: ' Татуировщик',
//       ar: ' فنان وشم',
//       he: 'מקעקע/ת',
//     },
//     {
//       en: 'Piercing Specialist',
//       ru: 'Специалист по пирсингу',
//       ar: 'اختصاصي ثقب',
//       he: 'מומחה/ית פירסינג',
//     },
//     {
//       en: 'Museum Guide',
//       ru: 'Экскурсовод в музее',
//       ar: 'مرشد في المتحف',
//       he: 'מדריך/ה במוזיאון',
//     },
//     {
//       en: 'Library Assistant',
//       ru: ' Ассистент библиотекаря',
//       ar: ' مساعد مكتبة',
//       he: 'עוזר/ת ספרן/ית',
//     },
//     {
//       en: 'Printing Machine Operator',
//       ru: ' Оператор печатной машины',
//       ar: 'مشغل آلة الطباعة',
//       he: 'מפעיל/ת מכונת דפוס',
//     },
//     {
//       en: 'Social Media Influencer',
//       ru: ' Инфлюенсер в социальных сетях',
//       ar: 'مؤثر على وسائل التواصل الاجتماعي',
//       he: 'משפיען/ית רשת',
//     },
//     {
//       en: 'Sales Promoter',
//       ru: ' Промоутер',
//       ar: 'مروج مبيعات',
//       he: 'דוגמן/ית קידום מכירות',
//     },
//     { he: 'שגריר/ה מותג' },
//     {
//       en: 'Surveyor',
//       ru: 'Измеритель',
//       ar: 'مساح',
//       he: 'סוקר/ת',
//     },
//     {
//       en: 'Roadside Assistance Technician',
//       ru: 'Техник аварийной помощи на дорогах',
//       ar: 'فني مساعدة على الطريق',
//       he: 'טכנאי/ת סיוע בצד הדרך',
//     },
//     {
//       en: 'Line Cook',
//       ru: 'Повар на линии',
//       ar: ' طباخ خط المطبخ',
//       he: 'טבח/ית פס (במטבח מסעדה)',
//     },
//     {
//       en: ' Mobile Phone Repair Technician',
//       ru: ' Техник по ремонту мобильных телефонов',
//       ar: ' فني تصليح الهواتف المحمولة',
//       he: 'טכנאי/ת תיקון טלפונים ניידים',
//     },
//     {
//       en: 'Customer Service',
//       ru: 'Обслуживание клиентов',
//       ar: 'خدمة العملاء',
//       he: 'שירות לקוחות',
//     },
//     {
//       en: 'Sales Expert',
//       ru: 'Эксперт по продажам',
//       ar: ' خبير مبيعات',
//       he: 'מומחה/ית במכירות',
//     },
//     {
//       en: 'Data Entry',
//       ru: 'Ввод данных',
//       ar: 'إدخال البيانات',
//       he: 'הקלדת נתונים',
//     },
//     {
//       en: 'Web Development',
//       ru: 'Графический дизайн',
//       ar: 'تصميم جرافيك',
//       he: 'עיצוב גרפי',
//     },
//     {
//       en: 'Web Development',
//       ru: 'Разработка веб-сайтов',
//       ar: 'تطوير المواقع الإلكترونية',
//       he: 'פיתוח אתרים',
//     },
//     {
//       en: ' Social Media Management',
//       ru: 'Управление социальными сетями',
//       ar: 'إدارة وسائل التواصل الاجتماعي',
//       he: 'ניהול מדיה חברתית',
//     },
//     {
//       en: ' Content Writing',
//       ru: 'Написание контента',
//       ar: 'كتابة المحتوى',
//       he: 'כתיבת תוכן',
//     },
//     {
//       en: 'Content Creator',
//       ru: 'Создатель контента',
//       ar: 'مبدع المحتوى',
//       he: 'יוצר/ת תוכן ',
//     },
//     {
//       en: 'SEO Expert',
//       ru: 'Эксперт по SEO',
//       ar: 'خبير SEO',
//       he: 'מומחיות SEO',
//     },
//   ];
//   Skill.bulkCreate(arr);
// }, 3000);
