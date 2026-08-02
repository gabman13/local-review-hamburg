const STORAGE_KEY = "local-review-helper-requests";
const LANGUAGE_KEY = "local-review-helper-language";
const REVIEW_SOURCES_STORAGE_KEY = "sternewerk-review-sources";
const PAGE_SIZE = 10;

const seedRequests = [
  {
    id: crypto.randomUUID(),
    customerName: "Maria S.",
    serviceDate: "2026-06-03",
    serviceType: "Apartment cleaning",
    satisfied: true,
    channel: "whatsapp",
    requestSent: true,
    followUpSent: false,
    reviewReceived: true,
    statusKey: "reviewed",
    actionKey: "reply",
    reviewDate: "2026-06-04",
    notes: "Positive review received",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Herr Weber",
    serviceDate: "2026-06-07",
    serviceType: "Office cleaning",
    satisfied: true,
    channel: "email",
    requestSent: true,
    followUpSent: true,
    reviewReceived: false,
    statusKey: "waiting",
    actionKey: "check",
    reviewDate: "",
    notes: "Follow-up sent after 3 days",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Cafe Morgen",
    serviceDate: "2026-06-11",
    serviceType: "Window cleaning",
    satisfied: true,
    channel: "qr",
    requestSent: true,
    followUpSent: false,
    reviewReceived: false,
    statusKey: "follow-up",
    actionKey: "reminder",
    reviewDate: "",
    notes: "Staff handed card after job",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Frau Klein",
    serviceDate: "2026-06-14",
    serviceType: "Move-out cleaning",
    satisfied: false,
    channel: "none",
    requestSent: false,
    followUpSent: false,
    reviewReceived: false,
    statusKey: "not-satisfied",
    actionKey: "resolve",
    reviewDate: "",
    notes: "Do not request review until issue resolved",
  },
];

const translations = {
  en: {
    metaTitle: "SterneWerk - MVP Dashboard",
    appTitle: "Review Collection Dashboard",
    exportCsv: "Export CSV",
    resetDemo: "Reset demo",
    demoBusiness: "Demo business",
    businessMeta: "Hamburg-Eimsbuttel · Cleaning company · Google rating 4.7",
    directReviewLink: "Direct Google review link",
    metricsAria: "Review system metrics",
    totalRequests: "Total requests",
    customersAsked: "Customers asked",
    reviewsReceived: "Reviews received",
    confirmedReviews: "Confirmed new reviews",
    conversionRate: "Conversion rate",
    requestsToReviews: "Requests to reviews",
    followUpsDue: "Follow-ups due",
    needsAttention: "Needs attention",
    tracker: "Tracker",
    pipelineTitle: "Review request pipeline",
    trackerHelper: "Keep one clean list of review requests, follow-ups, and confirmed reviews.",
    statusLabel: "Status",
    filterAll: "All",
    filterReviewed: "Review received",
    filterFollowUp: "Follow-up needed",
    filterWaiting: "Waiting",
    filterNotSatisfied: "Not satisfied",
    tableCustomer: "Customer",
    tableService: "Service",
    tableChannel: "Channel",
    tableStatus: "Status",
    tableNextAction: "Next action",
    addRequest: "Add request",
    logCustomer: "Log a customer",
    customerName: "Customer name",
    customerPlaceholder: "e.g. Frau Meyer",
    serviceType: "Service type",
    servicePlaceholder: "e.g. Window cleaning",
    requestChannel: "Request channel",
    initialStatus: "Initial status",
    nextAction: "Next action",
    customerSatisfied: "Customer satisfied",
    reviewReceivedCheck: "Review received",
    notes: "Notes",
    notesPlaceholder: "Anything the team should remember",
    addToTracker: "Add to tracker",
    generatedFilesEyebrow: "Generated files",
    generatedFilesTitle: "Generated files",
    generatedFilesText: "Five client-ready PDFs are available for the review collection system.",
    downloadAll: "Download all PDFs",
    download: "Download",
    downloadStarted: "Downloads started.",
    competitorGap: "Competitor gap",
    whyMatters: "Why this matters",
    reviewsLabel: "reviews",
    gapInsight:
      "The strongest nearby competitor has 186 more Google reviews. The system gives the team a repeatable way to close the gap over time by asking real satisfied customers.",
    templatesEyebrow: "Templates",
    readyMessages: "Ready messages",
    readyMessagesText: "Simple messages for WhatsApp, email, SMS, follow-ups, and staff handover.",
    copyMessage: "Copy message",
    copied: "Copied",
    footerProduct: "SterneWerk MVP",
    footerPrivacy: "Browser-only demo · Data stays on this device",
    languageLabel: "Language",
    previousPage: "Previous",
    nextPage: "Next",
    pageIndicator: "Page {current} of {total} · {count} entries",
    noRows: "No matching entries yet. Try another status or log the next customer.",
    today: "Today",
    undo: "Undo",
    markReview: "Mark review",
    sources: {
      eyebrow: "Review sources",
      title: "Connect review platforms",
      helper: "Paste a business profile URL. SterneWerk detects the platform and shows what a secure server connection can import.",
      urlLabel: "Business profile URL",
      urlPlaceholder: "https://maps.google.com/...",
      add: "Add review source",
      invalidUrl: "Enter a complete public profile URL.",
      unsupported: "This review platform is not supported yet.",
      added: "{provider} was added. A server connection is still needed before the first sync.",
      status: "Setup required",
      lastSync: "Last sync: not synced yet",
      imported: "{count} reviews imported",
      sync: "Sync now",
      remove: "Remove",
      syncBlocked: "This static demo cannot sync reviews. Add the provider credentials to a server first.",
      partial: "This provider may only return a partial review sample.",
      complete: "The completeness of this source is not confirmed until the server connection is configured.",
    },
    reviews: {
      eyebrow: "Imported reviews",
      title: "All customer reviews",
      helper: "Reviews appear here once a server-side provider connection has completed its first sync.",
      filterLabel: "Source",
      allSources: "All sources",
      empty: "No reviews have been imported yet. Add a review source, then connect its server-side provider to begin a real sync.",
    },
    providers: {
      google: { name: "Google Maps", note: "Public Places data is limited; full review access needs the verified business owner to connect Google Business Profile." },
      trustpilot: { name: "Trustpilot", note: "Requires Trustpilot Business API access and a server-side API key." },
      tripadvisor: { name: "TripAdvisor", note: "Partner API access is required and returned review content is limited." },
      yelp: { name: "Yelp", note: "Fusion API access is required; Yelp returns only a small set of review excerpts." },
      facebook: { name: "Facebook", note: "Public Facebook recommendations are not supported for automatic import in this MVP." },
    },
    channels: {
      whatsapp: "WhatsApp",
      email: "Email",
      qr: "QR card",
      phone: "Phone",
      none: "None",
    },
    statusSelect: {
      ready: "Ready to ask",
      "follow-up": "Follow-up needed",
      waiting: "Waiting",
      reviewed: "Review received",
      "not-satisfied": "Not satisfied",
    },
    actions: {
      send: "Send request",
      reminder: "Send reminder",
      check: "Check next week",
      reply: "Reply to review",
      resolve: "Resolve issue first",
    },
    statuses: {
      notSatisfied: { label: "Do not ask yet", action: "Resolve issue first" },
      reviewed: { label: "Review received", action: "Reply to review" },
      followUp: { label: "Follow-up needed", action: "Send reminder" },
      waiting: { label: "Waiting", action: "Check next week" },
      ready: { label: "Ready to ask", action: "Send request" },
    },
    files: {
      categories: {
        core: "Core files",
        support: "Support files",
        all: "All files",
      },
      audit: {
        title: "Google Review Audit PDF",
        description: "Review gap, competitor comparison, and recommended 30-day system.",
      },
      card: {
        title: "QR / NFC Review Card PDF",
        description: "Printable handover card for happy customers.",
      },
      staff: {
        title: "Staff Instruction Sheet PDF",
        description: "Simple routine for asking real customers for honest reviews.",
      },
      report: {
        title: "Monthly Review Report PDF",
        description: "Monthly progress summary with requests, new reviews, conversion, and next action.",
      },
      responses: {
        title: "Review Response Templates PDF",
        description: "Ready-to-adapt replies for positive, neutral, and critical Google reviews.",
      },
    },
    templates: {
      categories: {
        whatsapp: "WhatsApp",
        email: "Email",
        other: "Other",
        all: "All",
      },
      whatsappShort: {
        title: "WhatsApp short message",
        channel: "WhatsApp",
        body:
          "Hallo [Name], vielen Dank für Ihr Vertrauen. Wenn Sie mit unserer Arbeit zufrieden waren, freuen wir uns sehr über eine ehrliche Google-Bewertung:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank!",
      },
      whatsappFriendly: {
        title: "WhatsApp friendly message",
        channel: "WhatsApp",
        body:
          "Hallo [Name], vielen Dank, dass Sie sich für AlsterGlanz Reinigung entschieden haben. Wenn Sie mit unserer Arbeit zufrieden waren, würden wir uns sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nIhre Bewertung hilft anderen Kunden in Hamburg, einen verlässlichen Anbieter zu finden. Vielen Dank für Ihre Unterstützung!",
      },
      whatsappFollowup: {
        title: "WhatsApp follow-up message",
        channel: "WhatsApp",
        body:
          "Hallo [Name], ich wollte nur kurz freundlich nachfragen. Falls Sie eine Minute Zeit haben, würden wir uns weiterhin sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nNatürlich nur, wenn Sie mit unserer Arbeit zufrieden waren. Vielen Dank!",
      },
      emailShort: {
        title: "Email short message",
        channel: "Email",
        body:
          "Subject: Quick request for honest feedback\n\nHi [Name],\n\nThank you for choosing AlsterGlanz Reinigung. If you were happy with our service, we would really appreciate an honest Google review:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nThank you!",
      },
      emailProfessional: {
        title: "Email professional message",
        channel: "Email",
        body:
          "Subject: Thank you for your trust\n\nHi [Name],\n\nThank you again for choosing AlsterGlanz Reinigung. If you were satisfied with our work, we would be grateful for an honest Google review. Your feedback helps other local customers find a service they can trust.\n\nYou can leave a review here:\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nKind regards,\nAlsterGlanz Reinigung",
      },
      emailFollowup: {
        title: "Email follow-up message",
        channel: "Email",
        body:
          "Subject: Friendly reminder\n\nHi [Name],\n\nI just wanted to follow up once. If you were happy with our service and have one minute, we would really appreciate an honest Google review:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nThank you for supporting a local business.",
      },
      smsShort: {
        title: "SMS short message",
        channel: "SMS",
        body:
          "Hi [Name], thanks for choosing AlsterGlanz Reinigung. If you were happy with our work, please leave an honest Google review: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review",
      },
      staffInstruction: {
        title: "Staff internal instruction message",
        channel: "Internal",
        body:
          "After a customer confirms they are satisfied, ask politely for an honest Google review. Use the QR card or send the prepared WhatsApp/email text. Do not pressure customers, do not offer rewards, and never ask for fake reviews.",
      },
    },
  },
  de: {
    metaTitle: "SterneWerk - MVP-Dashboard",
    appTitle: "Dashboard für Bewertungsanfragen",
    exportCsv: "CSV exportieren",
    resetDemo: "Demo zurücksetzen",
    demoBusiness: "Demo-Unternehmen",
    businessMeta: "Hamburg-Eimsbüttel · Reinigungsfirma · Google-Bewertung 4,7",
    directReviewLink: "Direkter Google-Bewertungslink",
    metricsAria: "Kennzahlen des Bewertungssystems",
    totalRequests: "Anfragen gesamt",
    customersAsked: "Kunden angefragt",
    reviewsReceived: "Bewertungen erhalten",
    confirmedReviews: "Bestätigte neue Bewertungen",
    conversionRate: "Conversion-Rate",
    requestsToReviews: "Anfragen zu Bewertungen",
    followUpsDue: "Nachfassbedarf",
    needsAttention: "Braucht Aufmerksamkeit",
    tracker: "Tracker",
    pipelineTitle: "Pipeline für Bewertungsanfragen",
    trackerHelper: "Eine klare Liste für Bewertungsanfragen, Nachfassen und bestätigte Bewertungen.",
    statusLabel: "Status",
    filterAll: "Alle",
    filterReviewed: "Bewertung erhalten",
    filterFollowUp: "Nachfassen nötig",
    filterWaiting: "Wartet",
    filterNotSatisfied: "Nicht zufrieden",
    tableCustomer: "Kunde",
    tableService: "Leistung",
    tableChannel: "Kanal",
    tableStatus: "Status",
    tableNextAction: "Nächster Schritt",
    addRequest: "Anfrage hinzufügen",
    logCustomer: "Kunden eintragen",
    customerName: "Kundenname",
    customerPlaceholder: "z. B. Frau Meyer",
    serviceType: "Leistung",
    servicePlaceholder: "z. B. Fensterreinigung",
    requestChannel: "Anfragekanal",
    initialStatus: "Startstatus",
    nextAction: "Nächster Schritt",
    customerSatisfied: "Kunde ist zufrieden",
    reviewReceivedCheck: "Bewertung erhalten",
    notes: "Notizen",
    notesPlaceholder: "Was das Team wissen sollte",
    addToTracker: "Zum Tracker hinzufügen",
    generatedFilesEyebrow: "Generierte Dateien",
    generatedFilesTitle: "Generierte Dateien",
    generatedFilesText: "Fünf fertige PDFs stehen für das Bewertungssystem bereit.",
    downloadAll: "Alle PDFs herunterladen",
    download: "Herunterladen",
    downloadStarted: "Downloads gestartet.",
    competitorGap: "Wettbewerber-Abstand",
    whyMatters: "Warum das wichtig ist",
    reviewsLabel: "Bewertungen",
    gapInsight:
      "Der stärkste nahe Wettbewerber hat 186 Google-Bewertungen mehr. Das System hilft dem Team, diese Lücke Schritt für Schritt zu schließen, indem zufriedene echte Kunden regelmäßig gefragt werden.",
    templatesEyebrow: "Vorlagen",
    readyMessages: "Fertige Nachrichten",
    readyMessagesText: "Einfache Texte für WhatsApp, E-Mail, SMS, Nachfassen und interne Übergabe.",
    copyMessage: "Nachricht kopieren",
    copied: "Kopiert",
    footerProduct: "SterneWerk MVP",
    footerPrivacy: "Browser-Demo · Daten bleiben auf diesem Gerät",
    languageLabel: "Sprache",
    previousPage: "Zurück",
    nextPage: "Weiter",
    pageIndicator: "Seite {current} von {total} · {count} Einträge",
    noRows: "Noch keine passenden Einträge. Wählen Sie einen anderen Status oder tragen Sie den nächsten Kunden ein.",
    today: "Heute",
    undo: "Rückgängig",
    markReview: "Bewertung markieren",
    sources: {
      eyebrow: "Bewertungsquellen",
      title: "Bewertungsplattformen verbinden",
      helper: "Fügen Sie die URL eines Unternehmensprofils ein. SterneWerk erkennt die Plattform und zeigt, was eine sichere Server-Verbindung importieren kann.",
      urlLabel: "URL des Unternehmensprofils",
      urlPlaceholder: "https://maps.google.com/...",
      add: "Bewertungsquelle hinzufügen",
      invalidUrl: "Geben Sie eine vollständige öffentliche Profil-URL ein.",
      unsupported: "Diese Bewertungsplattform wird noch nicht unterstützt.",
      added: "{provider} wurde hinzugefügt. Vor der ersten Synchronisierung ist noch eine Server-Verbindung nötig.",
      status: "Einrichtung erforderlich",
      lastSync: "Letzte Synchronisierung: noch nicht synchronisiert",
      imported: "{count} Bewertungen importiert",
      sync: "Jetzt synchronisieren",
      remove: "Entfernen",
      syncBlocked: "Diese statische Demo kann keine Bewertungen synchronisieren. Richten Sie zuerst die Anbieter-Zugangsdaten auf einem Server ein.",
      partial: "Dieser Anbieter liefert möglicherweise nur eine begrenzte Bewertungsstichprobe.",
      complete: "Die Vollständigkeit ist erst nach Einrichtung der Server-Verbindung bestätigt.",
    },
    reviews: {
      eyebrow: "Importierte Bewertungen",
      title: "Alle Kundenbewertungen",
      helper: "Bewertungen erscheinen hier, sobald eine serverseitige Anbieter-Verbindung die erste Synchronisierung abgeschlossen hat.",
      filterLabel: "Quelle",
      allSources: "Alle Quellen",
      empty: "Noch wurden keine Bewertungen importiert. Fügen Sie eine Quelle hinzu und verbinden Sie den Anbieter auf dem Server, um eine echte Synchronisierung zu starten.",
    },
    providers: {
      google: { name: "Google Maps", note: "Öffentliche Places-Daten sind begrenzt; für vollständigen Zugriff muss der verifizierte Inhaber Google Business Profile verbinden." },
      trustpilot: { name: "Trustpilot", note: "Erfordert Zugang zur Trustpilot Business API und einen serverseitigen API-Schlüssel." },
      tripadvisor: { name: "TripAdvisor", note: "Partner-API-Zugang ist erforderlich; der zurückgegebene Bewertungsinhalt ist begrenzt." },
      yelp: { name: "Yelp", note: "Fusion-API-Zugang ist erforderlich; Yelp liefert nur wenige Bewertungsauszüge." },
      facebook: { name: "Facebook", note: "Öffentliche Facebook-Empfehlungen werden in diesem MVP nicht automatisch importiert." },
    },
    channels: {
      whatsapp: "WhatsApp",
      email: "E-Mail",
      qr: "QR-Karte",
      phone: "Telefon",
      none: "Keiner",
    },
    statusSelect: {
      ready: "Bereit zum Fragen",
      "follow-up": "Nachfassen nötig",
      waiting: "Wartet",
      reviewed: "Bewertung erhalten",
      "not-satisfied": "Nicht zufrieden",
    },
    actions: {
      send: "Anfrage senden",
      reminder: "Erinnerung senden",
      check: "Nächste Woche prüfen",
      reply: "Auf Bewertung antworten",
      resolve: "Problem zuerst lösen",
    },
    statuses: {
      notSatisfied: { label: "Noch nicht fragen", action: "Problem zuerst lösen" },
      reviewed: { label: "Bewertung erhalten", action: "Auf Bewertung antworten" },
      followUp: { label: "Nachfassen nötig", action: "Erinnerung senden" },
      waiting: { label: "Wartet", action: "Nächste Woche prüfen" },
      ready: { label: "Bereit zum Fragen", action: "Anfrage senden" },
    },
    files: {
      categories: {
        core: "Basis-Dateien",
        support: "Zusatz-Dateien",
        all: "Alle Dateien",
      },
      audit: {
        title: "Google-Bewertungs-Audit",
        description: "Bewertungslücke, Wettbewerbervergleich und empfohlener 30-Tage-Ablauf.",
      },
      card: {
        title: "QR-/NFC-Bewertungskarte",
        description: "Druckbare Karte für die Übergabe an zufriedene Kunden.",
      },
      staff: {
        title: "Mitarbeiter-Anleitung",
        description: "Einfacher Ablauf, um echte Kunden höflich nach ehrlichen Bewertungen zu fragen.",
      },
      report: {
        title: "Monatlicher Bewertungsbericht",
        description: "Monatliche Übersicht mit Anfragen, neuen Bewertungen, Conversion und nächstem Schritt.",
      },
      responses: {
        title: "Antwortvorlagen für Bewertungen",
        description: "Vorlagen für positive, neutrale und kritische Google-Bewertungen.",
      },
    },
    templates: {
      categories: {
        whatsapp: "WhatsApp",
        email: "E-Mail",
        other: "Weitere",
        all: "Alle",
      },
      whatsappShort: {
        title: "WhatsApp Kurztext",
        channel: "WhatsApp",
        body:
          "Hallo [Name], vielen Dank für Ihr Vertrauen. Wenn Sie mit unserer Arbeit zufrieden waren, freuen wir uns sehr über eine ehrliche Google-Bewertung:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank!",
      },
      whatsappFriendly: {
        title: "WhatsApp freundlicher Text",
        channel: "WhatsApp",
        body:
          "Hallo [Name], vielen Dank, dass Sie sich für AlsterGlanz Reinigung entschieden haben. Wenn Sie mit unserer Arbeit zufrieden waren, würden wir uns sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nIhre Bewertung hilft anderen Kunden in Hamburg, einen verlässlichen Anbieter zu finden. Vielen Dank für Ihre Unterstützung!",
      },
      whatsappFollowup: {
        title: "WhatsApp Nachfassnachricht",
        channel: "WhatsApp",
        body:
          "Hallo [Name], ich wollte nur kurz freundlich nachfragen. Falls Sie eine Minute Zeit haben, würden wir uns weiterhin sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nNatürlich nur, wenn Sie mit unserer Arbeit zufrieden waren. Vielen Dank!",
      },
      emailShort: {
        title: "E-Mail Kurztext",
        channel: "E-Mail",
        body:
          "Betreff: Kurze Bitte um ehrliches Feedback\n\nHallo [Name],\n\nvielen Dank, dass Sie sich für AlsterGlanz Reinigung entschieden haben. Wenn Sie mit unserer Arbeit zufrieden waren, freuen wir uns sehr über eine ehrliche Google-Bewertung:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank!",
      },
      emailProfessional: {
        title: "E-Mail professioneller Text",
        channel: "E-Mail",
        body:
          "Betreff: Vielen Dank für Ihr Vertrauen\n\nHallo [Name],\n\nvielen Dank nochmals, dass Sie sich für AlsterGlanz Reinigung entschieden haben. Wenn Sie mit unserer Arbeit zufrieden waren, würden wir uns sehr über eine ehrliche Google-Bewertung freuen. Ihre Bewertung hilft anderen lokalen Kunden, einen Anbieter zu finden, dem sie vertrauen können.\n\nHier können Sie Ihre Bewertung abgeben:\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nHerzliche Grüße\nAlsterGlanz Reinigung",
      },
      emailFollowup: {
        title: "E-Mail Nachfassnachricht",
        channel: "E-Mail",
        body:
          "Betreff: Freundliche Erinnerung\n\nHallo [Name],\n\nich wollte nur einmal kurz nachfassen. Falls Sie mit unserer Arbeit zufrieden waren und eine Minute Zeit haben, würden wir uns sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank für Ihre Unterstützung.",
      },
      smsShort: {
        title: "SMS Kurztext",
        channel: "SMS",
        body:
          "Hallo [Name], vielen Dank für Ihr Vertrauen. Wenn Sie zufrieden waren, freuen wir uns über eine ehrliche Google-Bewertung: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review",
      },
      staffInstruction: {
        title: "Interne Mitarbeiter-Anweisung",
        channel: "Intern",
        body:
          "Wenn ein Kunde bestätigt, dass er zufrieden ist, fragen Sie höflich nach einer ehrlichen Google-Bewertung. Nutzen Sie die QR-Karte oder senden Sie den vorbereiteten WhatsApp-/E-Mail-Text. Bitte keinen Druck machen, keine Belohnung anbieten und niemals nach Fake-Bewertungen fragen.",
      },
    },
  },
  ru: {
    metaTitle: "SterneWerk - MVP-панель",
    appTitle: "Панель сбора отзывов",
    exportCsv: "Экспорт CSV",
    resetDemo: "Сбросить демо",
    demoBusiness: "Демо-компания",
    businessMeta: "Гамбург-Эймсбюттель · Клининговая компания · Рейтинг Google 4,7",
    directReviewLink: "Прямая ссылка на отзыв в Google",
    metricsAria: "Показатели системы отзывов",
    totalRequests: "Всего запросов",
    customersAsked: "Клиентов попросили",
    reviewsReceived: "Отзывы получены",
    confirmedReviews: "Подтвержденные новые отзывы",
    conversionRate: "Конверсия",
    requestsToReviews: "Из запросов в отзывы",
    followUpsDue: "Нужно напомнить",
    needsAttention: "Требует внимания",
    tracker: "Трекер",
    pipelineTitle: "Воронка запросов отзывов",
    trackerHelper: "Один понятный список для запросов, напоминаний и полученных отзывов.",
    statusLabel: "Статус",
    filterAll: "Все",
    filterReviewed: "Отзыв получен",
    filterFollowUp: "Нужно напомнить",
    filterWaiting: "Ожидание",
    filterNotSatisfied: "Клиент недоволен",
    tableCustomer: "Клиент",
    tableService: "Услуга",
    tableChannel: "Канал",
    tableStatus: "Статус",
    tableNextAction: "Следующий шаг",
    addRequest: "Добавить запрос",
    logCustomer: "Записать клиента",
    customerName: "Имя клиента",
    customerPlaceholder: "например, Frau Meyer",
    serviceType: "Услуга",
    servicePlaceholder: "например, мойка окон",
    requestChannel: "Канал запроса",
    initialStatus: "Начальный статус",
    nextAction: "Следующий шаг",
    customerSatisfied: "Клиент доволен",
    reviewReceivedCheck: "Отзыв получен",
    notes: "Заметки",
    notesPlaceholder: "Что важно помнить команде",
    addToTracker: "Добавить в трекер",
    generatedFilesEyebrow: "Готовые файлы",
    generatedFilesTitle: "Готовые файлы",
    generatedFilesText: "Пять PDF-файлов готовы для системы сбора отзывов.",
    downloadAll: "Скачать все PDF",
    download: "Скачать",
    downloadStarted: "Загрузка началась.",
    competitorGap: "Разрыв с конкурентами",
    whyMatters: "Почему это важно",
    reviewsLabel: "отзывов",
    gapInsight:
      "У сильнейшего ближайшего конкурента на 186 отзывов Google больше. Эта система помогает команде постепенно сокращать разрыв, регулярно спрашивая реальных довольных клиентов.",
    templatesEyebrow: "Шаблоны",
    readyMessages: "Готовые сообщения",
    readyMessagesText: "Простые тексты для WhatsApp, email, SMS, напоминаний и передачи команде.",
    copyMessage: "Скопировать",
    copied: "Скопировано",
    footerProduct: "SterneWerk MVP",
    footerPrivacy: "Демо в браузере · Данные остаются на этом устройстве",
    languageLabel: "Язык",
    previousPage: "Назад",
    nextPage: "Вперед",
    pageIndicator: "Страница {current} из {total} · записей: {count}",
    noRows: "Под этот фильтр пока нет записей. Выберите другой статус или добавьте следующего клиента.",
    today: "Сегодня",
    undo: "Отменить",
    markReview: "Отметить отзыв",
    sources: {
      eyebrow: "Источники отзывов",
      title: "Подключите платформы с отзывами",
      helper: "Вставьте URL профиля компании. SterneWerk определит платформу и покажет, что можно импортировать через безопасное серверное подключение.",
      urlLabel: "URL профиля компании",
      urlPlaceholder: "https://maps.google.com/...",
      add: "Добавить источник отзывов",
      invalidUrl: "Введите полный публичный URL профиля.",
      unsupported: "Эта платформа с отзывами пока не поддерживается.",
      added: "{provider} добавлен. Перед первой синхронизацией нужно настроить серверное подключение.",
      status: "Требуется настройка",
      lastSync: "Последняя синхронизация: еще не выполнялась",
      imported: "Импортировано отзывов: {count}",
      sync: "Синхронизировать",
      remove: "Удалить",
      syncBlocked: "Эта статическая демоверсия не может синхронизировать отзывы. Сначала добавьте учетные данные провайдера на сервере.",
      partial: "Этот провайдер может возвращать только ограниченную выборку отзывов.",
      complete: "Полнота данных будет подтверждена после настройки серверного подключения.",
    },
    reviews: {
      eyebrow: "Импортированные отзывы",
      title: "Все отзывы клиентов",
      helper: "Отзывы появятся здесь после первой синхронизации через серверное подключение к провайдеру.",
      filterLabel: "Источник",
      allSources: "Все источники",
      empty: "Пока отзывы не импортированы. Добавьте источник, затем настройте провайдера на сервере, чтобы запустить настоящую синхронизацию.",
    },
    providers: {
      google: { name: "Google Maps", note: "Публичные данные Places ограничены; для полного доступа подтвержденный владелец должен подключить Google Business Profile." },
      trustpilot: { name: "Trustpilot", note: "Нужен доступ к Trustpilot Business API и серверный API-ключ." },
      tripadvisor: { name: "TripAdvisor", note: "Нужен доступ к партнерскому API; возвращаемый объем отзывов ограничен." },
      yelp: { name: "Yelp", note: "Нужен доступ к Fusion API; Yelp возвращает только небольшое число фрагментов отзывов." },
      facebook: { name: "Facebook", note: "Публичные рекомендации Facebook в этом MVP автоматически не импортируются." },
    },
    channels: {
      whatsapp: "WhatsApp",
      email: "Email",
      qr: "QR-карта",
      phone: "Телефон",
      none: "Нет",
    },
    statusSelect: {
      ready: "Готово к запросу",
      "follow-up": "Нужно напомнить",
      waiting: "Ожидание",
      reviewed: "Отзыв получен",
      "not-satisfied": "Клиент недоволен",
    },
    actions: {
      send: "Отправить запрос",
      reminder: "Отправить напоминание",
      check: "Проверить на следующей неделе",
      reply: "Ответить на отзыв",
      resolve: "Сначала решить проблему",
    },
    statuses: {
      notSatisfied: { label: "Пока не спрашивать", action: "Сначала решить проблему" },
      reviewed: { label: "Отзыв получен", action: "Ответить на отзыв" },
      followUp: { label: "Нужно напомнить", action: "Отправить напоминание" },
      waiting: { label: "Ожидание", action: "Проверить на следующей неделе" },
      ready: { label: "Готово к запросу", action: "Отправить запрос" },
    },
    files: {
      categories: {
        core: "Основные файлы",
        support: "Дополнительные файлы",
        all: "Все файлы",
      },
      audit: {
        title: "Аудит отзывов Google",
        description: "Разрыв по отзывам, сравнение с конкурентами и рекомендуемый план на 30 дней.",
      },
      card: {
        title: "QR-/NFC-карта для отзыва",
        description: "Печатная карточка, которую можно дать довольному клиенту после работы.",
      },
      staff: {
        title: "Инструкция для сотрудников",
        description: "Простой порядок, как вежливо просить реальных клиентов об честных отзывах.",
      },
      report: {
        title: "Ежемесячный отчет по отзывам",
        description: "Короткая сводка: запросы, новые отзывы, конверсия и следующий шаг.",
      },
      responses: {
        title: "Шаблоны ответов на отзывы",
        description: "Готовые ответы для позитивных, нейтральных и критических отзывов Google.",
      },
    },
    templates: {
      categories: {
        whatsapp: "WhatsApp",
        email: "Email",
        other: "Другое",
        all: "Все",
      },
      whatsappShort: {
        title: "Короткое сообщение WhatsApp",
        channel: "WhatsApp",
        body:
          "Здравствуйте, [Name]! Спасибо за доверие. Если Вы остались довольны нашей работой, будем очень благодарны за честный отзыв в Google:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nБольшое спасибо!",
      },
      whatsappFriendly: {
        title: "Дружелюбное сообщение WhatsApp",
        channel: "WhatsApp",
        body:
          "Здравствуйте, [Name]! Спасибо, что выбрали AlsterGlanz Reinigung. Если Вы остались довольны нашей работой, нам будет очень приятно получить честный отзыв в Google:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nВаш отзыв помогает другим клиентам в Гамбурге найти надежного исполнителя. Спасибо за поддержку!",
      },
      whatsappFollowup: {
        title: "Напоминание WhatsApp",
        channel: "WhatsApp",
        body:
          "Здравствуйте, [Name]! Хотели коротко напомнить: если у Вас есть одна минута и Вы остались довольны нашей работой, будем очень благодарны за честный отзыв в Google:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nКонечно, только если все было хорошо. Спасибо!",
      },
      emailShort: {
        title: "Короткий email",
        channel: "Email",
        body:
          "Тема: Короткая просьба об отзыве\n\nЗдравствуйте, [Name]!\n\nСпасибо, что выбрали AlsterGlanz Reinigung. Если Вы остались довольны нашей услугой, будем очень благодарны за честный отзыв в Google:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nСпасибо!",
      },
      emailProfessional: {
        title: "Профессиональный email",
        channel: "Email",
        body:
          "Тема: Спасибо за доверие\n\nЗдравствуйте, [Name]!\n\nЕще раз спасибо, что выбрали AlsterGlanz Reinigung. Если Вы остались довольны нашей работой, мы будем благодарны за честный отзыв в Google. Ваш отзыв помогает другим местным клиентам найти компанию, которой можно доверять.\n\nОставить отзыв можно здесь:\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nС уважением,\nAlsterGlanz Reinigung",
      },
      emailFollowup: {
        title: "Email-напоминание",
        channel: "Email",
        body:
          "Тема: Небольшое напоминание\n\nЗдравствуйте, [Name]!\n\nХотели один раз вежливо напомнить. Если Вы остались довольны нашей услугой и у Вас есть минутка, будем очень благодарны за честный отзыв в Google:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nСпасибо, что поддерживаете местный бизнес.",
      },
      smsShort: {
        title: "Короткое SMS",
        channel: "SMS",
        body:
          "Здравствуйте, [Name]! Спасибо, что выбрали AlsterGlanz Reinigung. Если Вы довольны нашей работой, оставьте, пожалуйста, честный отзыв в Google: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review",
      },
      staffInstruction: {
        title: "Внутренняя инструкция для команды",
        channel: "Внутреннее",
        body:
          "Когда клиент подтверждает, что доволен работой, вежливо попросите его оставить честный отзыв в Google. Используйте QR-карту или подготовленный текст для WhatsApp/email. Не давите на клиента, не предлагайте вознаграждение и никогда не просите фейковые отзывы.",
      },
    },
  },
};

const fileAssets = [
  {
    id: "audit",
    category: "core",
    fileName: "sample-review-gap-audit.pdf",
    path: "../output/pdf/sample-review-gap-audit.pdf",
    preview: "assets/google-review-audit-preview.png",
  },
  {
    id: "card",
    category: "core",
    fileName: "qr-review-card.pdf",
    path: "../output/pdf/qr-review-card.pdf",
    preview: "assets/qr-review-card-preview.png",
  },
  {
    id: "staff",
    category: "core",
    fileName: "staff-instruction-sheet.pdf",
    path: "../output/pdf/staff-instruction-sheet.pdf",
    preview: "assets/staff-instruction-sheet-preview.png",
  },
  {
    id: "report",
    category: "support",
    fileName: "monthly-review-report.pdf",
    path: "../output/pdf/monthly-review-report.pdf",
    preview: "assets/monthly-review-report-preview.png",
  },
  {
    id: "responses",
    category: "support",
    fileName: "review-response-templates.pdf",
    path: "../output/pdf/review-response-templates.pdf",
    preview: "assets/review-response-templates-preview.png",
  },
];

const templateOrder = [
  "whatsappShort",
  "whatsappFriendly",
  "whatsappFollowup",
  "emailShort",
  "emailProfessional",
  "emailFollowup",
  "smsShort",
  "staffInstruction",
];

const templateCategories = {
  whatsappShort: "whatsapp",
  whatsappFriendly: "whatsapp",
  whatsappFollowup: "whatsapp",
  emailShort: "email",
  emailProfessional: "email",
  emailFollowup: "email",
  smsShort: "other",
  staffInstruction: "other",
};

const fileCategoryOrder = ["core", "support", "all"];
const templateCategoryOrder = ["whatsapp", "email", "other", "all"];

const channelOptions = ["whatsapp", "email", "qr", "phone"];
const statusOptions = ["ready", "follow-up", "waiting", "reviewed", "not-satisfied"];
const actionOptions = ["send", "reminder", "check", "reply", "resolve"];
const defaultActionByStatus = {
  ready: "send",
  "follow-up": "reminder",
  waiting: "check",
  reviewed: "reply",
  "not-satisfied": "resolve",
};

const elements = {
  totalRequests: document.querySelector("#totalRequests"),
  reviewsReceived: document.querySelector("#reviewsReceived"),
  conversionRate: document.querySelector("#conversionRate"),
  followUpsDue: document.querySelector("#followUpsDue"),
  requestTable: document.querySelector("#requestTable"),
  statusFilter: document.querySelector("#statusFilter"),
  requestForm: document.querySelector("#requestForm"),
  resetDemo: document.querySelector("#resetDemo"),
  exportCsv: document.querySelector("#exportCsv"),
  generatedFiles: document.querySelector("#generatedFiles"),
  fileCategoryButtons: document.querySelector("#fileCategoryButtons"),
  downloadAll: document.querySelector("#downloadAll"),
  downloadStatus: document.querySelector("#downloadStatus"),
  templateGrid: document.querySelector("#templateGrid"),
  templateCategoryButtons: document.querySelector("#templateCategoryButtons"),
  channelSelect: document.querySelector("#channelSelect"),
  statusSelect: document.querySelector("#statusSelect"),
  actionSelect: document.querySelector("#actionSelect"),
  previousPage: document.querySelector("#previousPage"),
  nextPage: document.querySelector("#nextPage"),
  pageIndicator: document.querySelector("#pageIndicator"),
  languageSwitcher: document.querySelector("#languageSwitcher"),
  reviewSourceForm: document.querySelector("#reviewSourceForm"),
  reviewSourceUrl: document.querySelector("#reviewSourceUrl"),
  reviewSourceMessage: document.querySelector("#reviewSourceMessage"),
  reviewSources: document.querySelector("#reviewSources"),
  reviewSourceFilter: document.querySelector("#reviewSourceFilter"),
  importedReviews: document.querySelector("#importedReviews"),
};

let requests = loadRequests();
let reviewSources = loadReviewSources();
let language = localStorage.getItem(LANGUAGE_KEY) || "en";
if (!translations[language]) {
  language = "en";
}
let activeFileCategory = "core";
let activeTemplateCategory = "whatsapp";
let currentPage = 1;
let reviewSourceMessage = "";

function t(key) {
  const dictionary = translations[language] || translations.en;
  return key.split(".").reduce((value, part) => (value ? value[part] : undefined), dictionary) || key;
}

function loadRequests() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [...seedRequests];
  }

  try {
    return JSON.parse(saved).map(normalizeRequest);
  } catch {
    return [...seedRequests];
  }
}

function normalizeRequest(request) {
  const channelMap = {
    WhatsApp: "whatsapp",
    Email: "email",
    "QR card": "qr",
    Phone: "phone",
    None: "none",
  };

  return {
    ...request,
    channel: channelMap[request.channel] || request.channel || "whatsapp",
    statusKey: request.statusKey || inferStatusKey(request),
    actionKey: request.actionKey || defaultActionByStatus[request.statusKey || inferStatusKey(request)] || "send",
    previousStatusKey: request.previousStatusKey || "",
    previousActionKey: request.previousActionKey || "",
  };
}

function inferStatusKey(request) {
  if (!request.satisfied) {
    return "not-satisfied";
  }

  if (request.reviewReceived) {
    return "reviewed";
  }

  if (request.requestSent && !request.followUpSent) {
    return "follow-up";
  }

  return "waiting";
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function loadReviewSources() {
  const saved = localStorage.getItem(REVIEW_SOURCES_STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved).filter((source) => source && source.id && source.provider && source.normalizedUrl);
  } catch {
    return [];
  }
}

function saveReviewSources() {
  localStorage.setItem(REVIEW_SOURCES_STORAGE_KEY, JSON.stringify(reviewSources));
}

function sourceProviderCopy(source) {
  return t(`providers.${source.provider}`);
}

function renderReviewSources() {
  elements.reviewSourceMessage.textContent = reviewSourceMessage;
  elements.reviewSourceFilter.innerHTML = [
    `<option value="all">${t("reviews.allSources")}</option>`,
    ...reviewSources.map((source) => `<option value="${source.id}">${escapeHtml(sourceProviderCopy(source).name)}</option>`),
  ].join("");

  if (!reviewSources.length) {
    elements.reviewSources.innerHTML = "";
    return;
  }

  elements.reviewSources.innerHTML = reviewSources
    .map((source) => {
      const provider = sourceProviderCopy(source);
      const availability = source.publicDataset === "partial" ? t("sources.partial") : t("sources.complete");

      return `
        <article class="source-card">
          <div class="source-card-heading">
            <div>
              <span class="source-provider">${escapeHtml(provider.name)}</span>
              <strong>${t("sources.status")}</strong>
            </div>
            <a href="${escapeHtml(source.normalizedUrl)}" target="_blank" rel="noreferrer">${t("sources.urlLabel")}</a>
          </div>
          <p>${escapeHtml(provider.note)}</p>
          <p class="source-availability">${escapeHtml(availability)}</p>
          <div class="source-card-footer">
            <span>${t("sources.lastSync")} · ${t("sources.imported").replace("{count}", String(source.importedCount || 0))}</span>
            <div class="source-actions">
              <button class="row-action" type="button" data-sync-source="${source.id}">${t("sources.sync")}</button>
              <button class="row-action source-remove" type="button" data-remove-source="${source.id}">${t("sources.remove")}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderImportedReviews() {
  elements.importedReviews.innerHTML = `<p class="empty-reviews">${t("reviews.empty")}</p>`;
}

function getStatus(request) {
  if (request.statusKey && request.actionKey) {
    return {
      key: request.statusKey,
      copy: {
        label: t(`statusSelect.${request.statusKey}`),
        action: t(`actions.${request.actionKey}`),
      },
    };
  }

  if (!request.satisfied) {
    return { key: "not-satisfied", copy: t("statuses.notSatisfied") };
  }

  if (request.reviewReceived) {
    return { key: "reviewed", copy: t("statuses.reviewed") };
  }

  if (request.requestSent && !request.followUpSent) {
    return { key: "follow-up", copy: t("statuses.followUp") };
  }

  if (request.requestSent && request.followUpSent) {
    return { key: "waiting", copy: t("statuses.waiting") };
  }

  return { key: "waiting", copy: t("statuses.ready") };
}

function applyStaticTranslations() {
  document.documentElement.lang = language;
  document.title = t("metaTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      element.setAttribute(attribute, t(key));
    });
  });

  document.querySelectorAll("[data-count]").forEach((element) => {
    element.textContent = `${element.dataset.count} ${t("reviewsLabel")}`;
  });

  elements.languageSwitcher.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderChannelOptions() {
  const currentValue = elements.channelSelect.value || "whatsapp";
  elements.channelSelect.innerHTML = channelOptions
    .map((channel) => `<option value="${channel}">${t(`channels.${channel}`)}</option>`)
    .join("");
  elements.channelSelect.value = currentValue;
}

function renderStatusAndActionOptions() {
  const currentStatus = elements.statusSelect.value || "ready";
  const currentAction = elements.actionSelect.value || defaultActionByStatus[currentStatus];

  elements.statusSelect.innerHTML = statusOptions
    .map((status) => `<option value="${status}">${t(`statusSelect.${status}`)}</option>`)
    .join("");
  elements.statusSelect.value = currentStatus;

  elements.actionSelect.innerHTML = actionOptions
    .map((action) => `<option value="${action}">${t(`actions.${action}`)}</option>`)
    .join("");
  elements.actionSelect.value = currentAction;
}

function renderMetrics() {
  const askableRequests = requests.filter((request) => request.satisfied && request.requestSent).length;
  const received = requests.filter((request) => request.reviewReceived).length;
  const followUps = requests.filter((request) => getStatus(request).key === "follow-up").length;
  const conversion = askableRequests ? Math.round((received / askableRequests) * 100) : 0;

  elements.totalRequests.textContent = String(askableRequests);
  elements.reviewsReceived.textContent = String(received);
  elements.conversionRate.textContent = `${conversion}%`;
  elements.followUpsDue.textContent = String(followUps);
}

function renderTable() {
  const filter = elements.statusFilter.value;
  const rows = requests.filter((request) => {
    const status = getStatus(request);
    return filter === "all" || status.key === filter;
  });
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleRows = rows.slice(pageStart, pageStart + PAGE_SIZE);

  elements.requestTable.innerHTML = visibleRows
    .map((request) => {
      const status = getStatus(request);

      return `
        <tr>
          <td><strong>${escapeHtml(request.customerName)}</strong><br /><small>${escapeHtml(request.serviceDate || t("today"))}</small></td>
          <td>${escapeHtml(request.serviceType)}<br /><small>${escapeHtml(request.notes || "")}</small></td>
          <td>${escapeHtml(t(`channels.${request.channel}`))}</td>
          <td><span class="status-pill status-${status.key}">${status.copy.label}</span></td>
          <td>${status.copy.action}</td>
          <td><button class="row-action" type="button" data-toggle-review="${request.id}">${
            request.reviewReceived ? t("undo") : t("markReview")
          }</button></td>
        </tr>
      `;
    })
    .join("");

  if (!rows.length) {
    elements.requestTable.innerHTML = `
      <tr>
        <td colspan="6">${t("noRows")}</td>
      </tr>
    `;
  }

  elements.previousPage.disabled = currentPage <= 1;
  elements.nextPage.disabled = currentPage >= totalPages;
  elements.pageIndicator.textContent = t("pageIndicator")
    .replace("{current}", String(currentPage))
    .replace("{total}", String(totalPages))
    .replace("{count}", String(rows.length));
}

function renderGeneratedFiles() {
  elements.fileCategoryButtons.innerHTML = fileCategoryOrder
    .map(
      (category) => `
        <button class="category-button ${category === activeFileCategory ? "active" : ""}" type="button" data-file-category="${category}">
          ${t(`files.categories.${category}`)}
        </button>
      `
    )
    .join("");

  const visibleFiles = fileAssets.filter((file) => activeFileCategory === "all" || file.category === activeFileCategory);

  elements.generatedFiles.innerHTML = visibleFiles
    .map((file) => {
      const copy = t(`files.${file.id}`);

      return `
        <article class="file-card">
          <div class="file-preview">
            <img src="${file.preview}" alt="${escapeHtml(copy.title)} preview" onerror="this.remove(); this.parentElement.querySelector('.file-icon').hidden = false;" />
            <div class="file-icon" hidden>PDF</div>
          </div>
          <div>
            <h3>${copy.title}</h3>
            <p>${copy.description}</p>
          </div>
          <a class="button secondary" href="${file.path}" download="${file.fileName}">${t("download")}</a>
        </article>
      `;
    })
    .join("");
}

function renderTemplates() {
  elements.templateCategoryButtons.innerHTML = templateCategoryOrder
    .map(
      (category) => `
        <button class="category-button ${category === activeTemplateCategory ? "active" : ""}" type="button" data-template-category="${category}">
          ${t(`templates.categories.${category}`)}
        </button>
      `
    )
    .join("");

  const visibleTemplates = templateOrder.filter(
    (id) => activeTemplateCategory === "all" || templateCategories[id] === activeTemplateCategory
  );

  elements.templateGrid.innerHTML = visibleTemplates
    .map((id) => {
      const template = t(`templates.${id}`);

      return `
        <article class="template-card">
          <div class="template-card-header">
            <div>
              <h3>${template.title}</h3>
              <small>${template.channel}</small>
            </div>
            <button class="button ghost copy-template" type="button" data-copy-template="${id}">${t("copyMessage")}</button>
          </div>
          <pre>${escapeHtml(template.body)}</pre>
        </article>
      `;
    })
    .join("");
}

function render() {
  applyStaticTranslations();
  renderChannelOptions();
  renderStatusAndActionOptions();
  renderMetrics();
  renderTable();
  renderGeneratedFiles();
  renderTemplates();
  renderReviewSources();
  renderImportedReviews();
  saveRequests();
  saveReviewSources();
}

function addReviewSource(event) {
  event.preventDefault();
  const detected = window.ReviewProviders.detect(elements.reviewSourceUrl.value);

  if (!detected.ok) {
    reviewSourceMessage = t(detected.reason === "invalid-url" ? "sources.invalidUrl" : "sources.unsupported");
    renderReviewSources();
    return;
  }

  if (detected.connection === "not-supported") {
    reviewSourceMessage = t("sources.unsupported");
    renderReviewSources();
    return;
  }

  const existing = reviewSources.find((source) => source.normalizedUrl === detected.normalizedUrl);
  const provider = t(`providers.${detected.provider}`);

  if (existing) {
    reviewSourceMessage = t("sources.added").replace("{provider}", provider.name);
    renderReviewSources();
    return;
  }

  reviewSources = [
    {
      id: crypto.randomUUID(),
      provider: detected.provider,
      originalUrl: detected.originalUrl,
      normalizedUrl: detected.normalizedUrl,
      publicDataset: detected.publicDataset,
      connection: detected.connection,
      status: "needs-server",
      importedCount: 0,
      lastSyncedAt: "",
    },
    ...reviewSources,
  ];
  reviewSourceMessage = t("sources.added").replace("{provider}", provider.name);
  elements.reviewSourceForm.reset();
  render();
}

function handleReviewSourceAction(event) {
  const syncButton = event.target.closest("[data-sync-source]");
  const removeButton = event.target.closest("[data-remove-source]");

  if (syncButton) {
    reviewSourceMessage = t("sources.syncBlocked");
    renderReviewSources();
  }

  if (removeButton) {
    reviewSources = reviewSources.filter((source) => source.id !== removeButton.dataset.removeSource);
    reviewSourceMessage = "";
    render();
  }
}

function addRequest(event) {
  event.preventDefault();
  const formData = new FormData(elements.requestForm);
  const statusKey = String(formData.get("statusKey"));
  const actionKey = String(formData.get("actionKey"));
  const state = deriveStateFromStatus(statusKey, formData.get("satisfied") === "on");

  requests = [
    {
      id: crypto.randomUUID(),
      customerName: String(formData.get("customerName")).trim(),
      serviceDate: new Date().toISOString().slice(0, 10),
      serviceType: String(formData.get("serviceType")).trim(),
      satisfied: state.satisfied,
      channel: String(formData.get("channel")),
      requestSent: state.requestSent,
      followUpSent: state.followUpSent,
      reviewReceived: state.reviewReceived,
      statusKey,
      actionKey,
      reviewDate: state.reviewReceived ? new Date().toISOString().slice(0, 10) : "",
      notes: String(formData.get("notes")).trim(),
    },
    ...requests,
  ];

  elements.requestForm.reset();
  elements.requestForm.satisfied.checked = true;
  currentPage = 1;
  render();
}

function deriveStateFromStatus(statusKey, checkedSatisfied) {
  if (statusKey === "not-satisfied") {
    return { satisfied: false, requestSent: false, followUpSent: false, reviewReceived: false };
  }

  if (statusKey === "reviewed") {
    return { satisfied: true, requestSent: true, followUpSent: false, reviewReceived: true };
  }

  if (statusKey === "follow-up") {
    return { satisfied: true, requestSent: true, followUpSent: false, reviewReceived: false };
  }

  if (statusKey === "waiting") {
    return { satisfied: true, requestSent: true, followUpSent: true, reviewReceived: false };
  }

  return { satisfied: checkedSatisfied, requestSent: checkedSatisfied, followUpSent: false, reviewReceived: false };
}

function fallbackStatusBeforeReview(request) {
  if (!request.satisfied) {
    return "not-satisfied";
  }

  if (request.followUpSent) {
    return "waiting";
  }

  if (request.requestSent) {
    return "follow-up";
  }

  return "ready";
}

function toggleReview(id) {
  requests = requests.map((request) => {
    if (request.id !== id) {
      return request;
    }

    const nextValue = !request.reviewReceived;
    const currentStatusKey = request.statusKey || inferStatusKey(request);
    const currentActionKey = request.actionKey || defaultActionByStatus[currentStatusKey] || "send";

    if (!nextValue) {
      const restoredStatusKey =
        request.previousStatusKey && request.previousStatusKey !== "reviewed"
          ? request.previousStatusKey
          : fallbackStatusBeforeReview({ ...request, reviewReceived: false });
      const restoredActionKey =
        request.previousActionKey || defaultActionByStatus[restoredStatusKey] || currentActionKey || "check";
      const restoredState = deriveStateFromStatus(restoredStatusKey, request.satisfied);

      return {
        ...request,
        ...restoredState,
        reviewReceived: false,
        statusKey: restoredStatusKey,
        actionKey: restoredActionKey,
        reviewDate: "",
        previousStatusKey: "",
        previousActionKey: "",
      };
    }

    return {
      ...request,
      satisfied: true,
      requestSent: true,
      reviewReceived: true,
      statusKey: "reviewed",
      actionKey: "reply",
      reviewDate: new Date().toISOString().slice(0, 10),
      previousStatusKey: currentStatusKey === "reviewed" ? "" : currentStatusKey,
      previousActionKey: currentStatusKey === "reviewed" ? "" : currentActionKey,
    };
  });

  render();
}

function exportCsv() {
  const headers = [
    "Customer Name",
    "Service Date",
    "Service Type",
    "Satisfied?",
    "Request Channel",
    "Request Sent",
    "Follow-Up Sent",
    "Review Received",
    "Review Date",
    "Notes",
  ];
  const lines = [
    headers,
    ...requests.map((request) => [
      request.customerName,
      request.serviceDate,
      request.serviceType,
      request.satisfied ? "Yes" : "No",
      t(`channels.${request.channel}`),
      request.requestSent ? "Yes" : "No",
      request.followUpSent ? "Yes" : "No",
      request.reviewReceived ? "Yes" : "No",
      request.reviewDate,
      request.notes,
    ]),
  ];
  const csv = lines.map((row) => row.map(csvCell).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "review-tracker-export.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function downloadAllFiles() {
  fileAssets.forEach((file, index) => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = file.path;
      link.download = file.fileName;
      document.body.append(link);
      link.click();
      link.remove();
    }, index * 250);
  });

  elements.downloadStatus.textContent = t("downloadStarted");
  setTimeout(() => {
    elements.downloadStatus.textContent = "";
  }, 2200);
}

async function copyText(text) {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API unavailable");
    }

    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

async function copyTemplate(id, button) {
  await copyText(t(`templates.${id}`).body);
  const originalText = button.textContent;
  button.textContent = t("copied");
  setTimeout(() => {
    button.textContent = originalText;
  }, 1200);
}

function setLanguage(nextLanguage) {
  language = translations[nextLanguage] ? nextLanguage : "en";
  localStorage.setItem(LANGUAGE_KEY, language);
  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

elements.requestForm.addEventListener("submit", addRequest);
elements.reviewSourceForm.addEventListener("submit", addReviewSource);
elements.reviewSources.addEventListener("click", handleReviewSourceAction);
elements.statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});
elements.resetDemo.addEventListener("click", () => {
  requests = [...seedRequests];
  currentPage = 1;
  render();
});
elements.exportCsv.addEventListener("click", exportCsv);
elements.downloadAll.addEventListener("click", downloadAllFiles);
elements.previousPage.addEventListener("click", () => {
  currentPage = Math.max(1, currentPage - 1);
  renderTable();
});
elements.nextPage.addEventListener("click", () => {
  currentPage += 1;
  renderTable();
});
elements.languageSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-language]");

  if (button) {
    setLanguage(button.dataset.language);
  }
});
elements.fileCategoryButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-file-category]");

  if (button) {
    activeFileCategory = button.dataset.fileCategory;
    renderGeneratedFiles();
  }
});
elements.templateCategoryButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-template-category]");

  if (button) {
    activeTemplateCategory = button.dataset.templateCategory;
    renderTemplates();
  }
});
elements.statusSelect.addEventListener("change", () => {
  const statusKey = elements.statusSelect.value;
  elements.actionSelect.value = defaultActionByStatus[statusKey] || "send";
  elements.requestForm.satisfied.checked = statusKey !== "not-satisfied";
  elements.requestForm.reviewReceived.checked = statusKey === "reviewed";
});
elements.requestForm.reviewReceived.addEventListener("change", () => {
  if (elements.requestForm.reviewReceived.checked) {
    elements.statusSelect.value = "reviewed";
    elements.actionSelect.value = "reply";
  }
});
elements.requestForm.satisfied.addEventListener("change", () => {
  if (!elements.requestForm.satisfied.checked) {
    elements.statusSelect.value = "not-satisfied";
    elements.actionSelect.value = "resolve";
    elements.requestForm.reviewReceived.checked = false;
  }
});
elements.requestTable.addEventListener("click", (event) => {
  const button = event.target.closest("[data-toggle-review]");

  if (button) {
    toggleReview(button.dataset.toggleReview);
  }
});
elements.templateGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy-template]");

  if (button) {
    copyTemplate(button.dataset.copyTemplate, button);
  }
});

render();
