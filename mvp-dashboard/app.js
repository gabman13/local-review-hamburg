const STORAGE_KEY = "local-review-helper-requests";

const seedRequests = [
  {
    id: crypto.randomUUID(),
    customerName: "Maria S.",
    serviceDate: "2026-06-03",
    serviceType: "Apartment cleaning",
    satisfied: true,
    channel: "WhatsApp",
    requestSent: true,
    followUpSent: false,
    reviewReceived: true,
    reviewDate: "2026-06-04",
    notes: "Positive review received",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Herr Weber",
    serviceDate: "2026-06-07",
    serviceType: "Office cleaning",
    satisfied: true,
    channel: "Email",
    requestSent: true,
    followUpSent: true,
    reviewReceived: false,
    reviewDate: "",
    notes: "Follow-up sent after 3 days",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Cafe Morgen",
    serviceDate: "2026-06-11",
    serviceType: "Window cleaning",
    satisfied: true,
    channel: "QR card",
    requestSent: true,
    followUpSent: false,
    reviewReceived: false,
    reviewDate: "",
    notes: "Staff handed card after job",
  },
  {
    id: crypto.randomUUID(),
    customerName: "Frau Klein",
    serviceDate: "2026-06-14",
    serviceType: "Move-out cleaning",
    satisfied: false,
    channel: "None",
    requestSent: false,
    followUpSent: false,
    reviewReceived: false,
    reviewDate: "",
    notes: "Do not request review until issue resolved",
  },
];

const templates = {
  whatsapp:
    "Hallo [Name], vielen Dank, dass Sie sich für AlsterGlanz Reinigung entschieden haben. Wenn Sie mit unserer Arbeit zufrieden waren, würden wir uns sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank für Ihre Unterstützung!",
  email:
    "Betreff: Kurze Bitte um ehrliches Feedback\n\nHallo [Name],\n\nvielen Dank nochmals für Ihr Vertrauen. Wenn Sie mit unserer Arbeit zufrieden waren, würden wir uns sehr über eine ehrliche Google-Bewertung freuen. Ihre Bewertung hilft anderen Kunden in Hamburg, einen verlässlichen Anbieter zu finden.\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nVielen Dank und herzliche Grüße\nAlsterGlanz Reinigung",
  followup:
    "Hallo [Name], ich wollte nur kurz freundlich nachfragen. Falls Sie eine Minute Zeit haben, würden wir uns weiterhin sehr über eine ehrliche Google-Bewertung freuen:\n\nhttps://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review\n\nNatürlich nur, wenn Sie mit unserer Arbeit zufrieden waren. Vielen Dank!",
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
  templateText: document.querySelector("#templateText"),
  copyTemplate: document.querySelector("#copyTemplate"),
  templateTabs: document.querySelectorAll(".template-tab"),
};

let requests = loadRequests();
let activeTemplate = "whatsapp";

function loadRequests() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [...seedRequests];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [...seedRequests];
  }
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function getStatus(request) {
  if (!request.satisfied) {
    return {
      key: "not-satisfied",
      label: "Do not ask yet",
      action: "Resolve issue first",
    };
  }

  if (request.reviewReceived) {
    return {
      key: "reviewed",
      label: "Review received",
      action: "Reply to review",
    };
  }

  if (request.requestSent && !request.followUpSent) {
    return {
      key: "follow-up",
      label: "Follow-up needed",
      action: "Send reminder",
    };
  }

  if (request.requestSent && request.followUpSent) {
    return {
      key: "waiting",
      label: "Waiting",
      action: "Check next week",
    };
  }

  return {
    key: "waiting",
    label: "Ready to ask",
    action: "Send request",
  };
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

  elements.requestTable.innerHTML = rows
    .map((request) => {
      const status = getStatus(request);

      return `
        <tr>
          <td><strong>${escapeHtml(request.customerName)}</strong><br /><small>${escapeHtml(request.serviceDate || "Today")}</small></td>
          <td>${escapeHtml(request.serviceType)}<br /><small>${escapeHtml(request.notes || "")}</small></td>
          <td>${escapeHtml(request.channel)}</td>
          <td><span class="status-pill status-${status.key}">${status.label}</span></td>
          <td>${status.action}</td>
          <td><button class="row-action" type="button" data-toggle-review="${request.id}">${
            request.reviewReceived ? "Undo" : "Mark review"
          }</button></td>
        </tr>
      `;
    })
    .join("");

  if (!rows.length) {
    elements.requestTable.innerHTML = `
      <tr>
        <td colspan="6">No requests match this filter yet.</td>
      </tr>
    `;
  }
}

function renderTemplate() {
  elements.templateText.textContent = templates[activeTemplate];
  elements.copyTemplate.textContent = `Copy ${activeTemplate === "followup" ? "Follow-up" : capitalize(activeTemplate)}`;
  elements.templateTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.template === activeTemplate);
  });
}

function render() {
  renderMetrics();
  renderTable();
  renderTemplate();
  saveRequests();
}

function addRequest(event) {
  event.preventDefault();
  const formData = new FormData(elements.requestForm);
  const satisfied = formData.get("satisfied") === "on";
  const reviewReceived = formData.get("reviewReceived") === "on";

  requests = [
    {
      id: crypto.randomUUID(),
      customerName: String(formData.get("customerName")).trim(),
      serviceDate: new Date().toISOString().slice(0, 10),
      serviceType: String(formData.get("serviceType")).trim(),
      satisfied,
      channel: String(formData.get("channel")),
      requestSent: satisfied,
      followUpSent: false,
      reviewReceived,
      reviewDate: reviewReceived ? new Date().toISOString().slice(0, 10) : "",
      notes: String(formData.get("notes")).trim(),
    },
    ...requests,
  ];

  elements.requestForm.reset();
  elements.requestForm.satisfied.checked = true;
  render();
}

function toggleReview(id) {
  requests = requests.map((request) => {
    if (request.id !== id) {
      return request;
    }

    const nextValue = !request.reviewReceived;
    return {
      ...request,
      reviewReceived: nextValue,
      reviewDate: nextValue ? new Date().toISOString().slice(0, 10) : "",
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
      request.channel,
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

async function copyTemplate() {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API unavailable");
    }

    await navigator.clipboard.writeText(templates[activeTemplate]);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = templates[activeTemplate];
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  const originalText = elements.copyTemplate.textContent;
  elements.copyTemplate.textContent = "Copied";
  setTimeout(() => {
    elements.copyTemplate.textContent = originalText;
  }, 1200);
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

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

elements.requestForm.addEventListener("submit", addRequest);
elements.statusFilter.addEventListener("change", renderTable);
elements.resetDemo.addEventListener("click", () => {
  requests = [...seedRequests];
  render();
});
elements.exportCsv.addEventListener("click", exportCsv);
elements.copyTemplate.addEventListener("click", copyTemplate);
elements.requestTable.addEventListener("click", (event) => {
  const button = event.target.closest("[data-toggle-review]");

  if (button) {
    toggleReview(button.dataset.toggleReview);
  }
});
elements.templateTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeTemplate = tab.dataset.template;
    renderTemplate();
  });
});

render();
