import {
  news,
  cooperation,
  document,
  research,
  experiment,
  volunteers,
  scholarship,
  funding,
  donations,
  code,
  essay,
  congratulations,
  summery,
  shortStory,
  product,
  event,
  announcement,
  quotation,
  story,
  questionnaire,
} from "../../assets/images/icons/categories";

export const forms = [
  {
    formName: "Add News",
    formTitle: "News",
    formIcon: news,
    formFields: [
      {
        label: "news_title",
        type: "text",
        name: "News Title",
        state: "news_title",
      },
      {
        label: "Date",
        type: "date",
        name: "Date of News",
        state: "date",
      },
      {
        label: "Details",
        type: "textarea",
        name: "Details",
        state: "details",
      },
      {
        label: "Source Url",
        type: "url",
        name: "Url",
        state: "url",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "File",
        state: "file",
      },
    ],
  },
  {
    formName: "Suggest Collaboration",
    formIcon: cooperation,
    formTitle: "Cooperation",
    formFields: [
      {
        label: "Category",
        type: "text",
        name: "Project Title",
        state: "project_title",
      },
      {
        label: "details",
        type: "textarea",
        name: "Details",
        state: "details",
      },
      {
        label: "Skills",
        type: "textarea",
        name: "Skills",
        state: "skills",
      },
      {
        label: "Members",
        type: "text",
        name: "Members",
        state: "members",
      },
      {
        label: "Date",
        type: "date",
        name: "Date",
        state: "date",
      },

      {
        label: "Upload file",
        type: "filemulti",
        name: "File",
        state: "file",
      },
    ],
  },
  {
    formName: "Document Check up",
    formTitle: "Document Check up",
    formIcon: document,
    formFields: [
      {
        label: "Category",
        type: "select",
        name: "Documentation type",
        state: "documentation_type",
        select: [
          "CV",
          "Recommendation letter",
          "Research statement",
          "Teaching statement",
          "Cover letter",
          "Message for Journal or Researcher",
          "Others",
        ],
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      { label: "Deadline", type: "date", name: "Deadline", state: "deadline" },
      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Scientific Research Summary",
    formTitle: "Research",
    formIcon: research,
    formFields: [
      { label: "title", type: "text", name: "Title", state: "title" },
      { label: "summary", type: "textarea", name: "Summary", state: "summary" },
      {
        label: "importance",
        type: "textarea",
        name: "Importance",
        state: "importance",
      },

      {
        label: "url",
        type: "url",
        name: "Url",
        state: "url",
      },
      {
        label: "Date",
        type: "date",
        name: "Date of publication of the research",
        state: "date",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Add Science Experiment",
    formTitle: "Experiment",
    formIcon: experiment,
    formFields: [
      { label: "title", type: "text", name: "Title", state: "title" },
      { label: "tools", type: "textarea", name: "Tools", state: "tools" },
      {
        label: "steps",
        type: "textarea",
        name: "Steps",
        state: "steps",
      },
      {
        label: "discussion",
        type: "textarea",
        name: "Discussion",
        state: "discussion",
      },
      {
        label: "references",
        type: "textarea",
        name: "References",
        state: "references",
      },
      // {
      //   label: "authors",
      //   type: "text",
      //   name: "Authors",
      //   state: "authors",
      // },
      
      // add by abdallah
      {
        label: "url",
        type: "url",
        name: "Url",
        state: "url",
      },
      // { label: "Date", type: "date", name: "Date", state: "date" },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Request for Volunteers or Trainees",
    formTitle: "Volunteers",
    formIcon: volunteers,
    formFields: [
      {
        label: "how_apply",
        type: "text",
        name: "How to apply",
        state: "how_apply",
      },
      { label: "Skills", type: "textarea", name: "Skills", state: "skills" },
      { label: "Place", type: "text", name: "Place", state: "place" },
      { label: "Details", type: "textarea", name: "Details", state: "details" },

      {
        label: "Paid or Free",
        type: "select",
        name: "Paid or Free",
        state: "paid_or_free",
        select: ["paid", "free"],
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Scholarship Announcement",
    formTitle: "Scholarship",
    formIcon: scholarship,
    formFields: [
      {
        label: "Announcement Name",
        type: "text",
        name: "Announcement Name",
        state: "name",
      },
      {
        label: "Name of Organization",
        type: "text",
        name: "Name of Organization",
        state: "organization",
      },

      {
        label: "Details Of Scholarship",
        type: "textarea",
        name: "Details Of Scholarship",
        state: "details",
      },
      {
        label: "Conditions",
        name: "Conditions",
        type: "textarea",
        state: "conditions",
      }
      //Add by abdallah
      ,
      {
        label: "url",
        type: "url",
        name: "Url",
        state: "url",
      },
      { label: "Deadline", name: "Deadline", type: "date", state: "deadline" },
      {
        label: "Upload file",
        name: "Upload file",
        type: "filemulti",
        state: "file",
      },
    ],
  },
  {
    formName: "Project Funding",
    formTitle: "Project Support",
    formIcon: funding,
    formFields: [
      {
        label: "Name of project",
        type: "text",
        name: "Name of project",
        state: "name",
      },
      {
        label: "Name of Funding Organization",
        type: "text",
        name: "Name of Funding Organization",
        state: "organization",
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      { label: "Deadline", type: "date", name: "Deadline", state: "deadline" },
      { label: "Url", type: "url", name: "Url", state: "url" },

      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Announcing Course",
    formTitle: "Announcing For Course",
    formIcon: funding,
    formFields: [
      {
        label: "Name of Funding Organization",
        type: "text",
        name: "Organization",
        state: "organization",
      },
      {
        label: "Name of project",
        type: "text",
        name: "Course Name",
        state: "name",
      },
      {
        label: "price",
        type: "number",
        name: "Price ( US dollars )",
        state: "price",
      },
      { label: "email", type: "email", name: "Email", state: "email" },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Request for a Scientific Service",
    formTitle: "Request for service",
    formIcon: funding,
    formFields: [
      {
        label: "Service Name with times",
        type: "text",
        name: "Service Name",
        state: "name",
      },
      {
        label: "price",
        type: "number",
        name: "Number of Days",
        state: "price",
      },
      { label: "email", type: "email", name: "Email", state: "email" },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },

  {
    formName: "Donations",
    formTitle: "Donation",
    formIcon: donations,
    formFields: [
      { label: "Date", type: "date", name: "Delivery Date", state: "date" },
      {
        label: "Donation Type",
        type: "text",
        name: "Donation Type",
        state: "type",
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      {
        label: "Target People",
        type: "text",
        name: "Target People",
        state: "people",
      },
      {
        label: "Delivery Mechanism",
        type: "text",
        name: "Delivery Mechanism",
        state: "delivery_mechanism",
      },
      { label: "Url", type: "url", name: "Url", state: "url" },

      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Code Inquiry",
    formTitle: "Code Inquiry",
    formIcon: code,
    formFields: [
      {
        label: "Inquiry",
        type: "textarea",
        name: "Inquiry",
        state: "title",
      },
      { label: "Code", type: "textarea", name: "Code", state: "code" },
      { label: "Code Type", type: "text", name: "Code Type", state: "type" },
      { label: "Url", type: "url", name: "Url", state: "url" },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Add Essay",
    formTitle: "Add Essay",
    formIcon: essay,
    formFields: [
      { label: "Date", type: "date", name: "Date", state: "date" },
      {
        label: "Essay Title",
        type: "text",
        name: "Essay Title",
        state: "title",
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      { label: "Url", type: "url", name: "Url", state: "url" },

      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Add Congratulations",
    formTitle: "Congrats",
    formIcon: congratulations,
    formFields: [
      {
        label: "Congratulations Title",
        type: "text",
        name: "Congratulations Title",
        state: "title",
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      { label: "Date", type: "date", name: "Date", state: "date" },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Summary of Book, Novel or Film",
    formTitle: "Novel Summary",
    formIcon: summery,
    formFields: [
      {
        label: "Novel or Book title",
        type: "text",
        name: "Novel or Book title",
        state: "title",
      },
      { label: "Summary", type: "textarea", name: "Summary", state: "summary" },
      // { label: "Details", type: "textarea", name: "Details", state: "details" },
      {
        label: "Learned Lessonss",
        type: "textarea",
        name: "Learned Lessons",
        state: "learned_lesson",
      },
      { label: "Authors", type: "textarea", name: "Authors", state: "author" },
      {
        label: "Novel or Book url",
        type: "url",
        name: "Novel or Book url",
        state: "url",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Add Short Story",
    formTitle: "Short Story",
    formIcon: shortStory,
    formFields: [
      {
        label: "Story Title",
        type: "text",
        name: "Story Title",
        state: "title",
      },
      { label: "Story", type: "textarea", name: "Story", state: "story" },
      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Offer Commercial Product",
    formTitle: "Offer Product",
    formIcon: product,
    formFields: [
      {
        label: "Product Name",
        type: "text",
        name: "Product Name",
        state: "name",
      },
      {
        label: "Offer Details",
        type: "textarea",
        name: "Offer Details",
        state: "details",
      },
      {
        label: "Price",
        type: "text",
        name: "Price",
        state: "email",
      },
      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Announcing for an Event",
    formTitle: "Event Announcement",
    formIcon: event,
    formFields: [
      {
        label: "Organization",
        type: "text",
        name: "Organization",
        state: "organization",
      },
      { label: "Event Name", type: "text", name: "Event Name", state: "name" },
      {
        label: "Event Details",
        type: "textarea",
        name: "Event Details",
        state: "details",
      },
      { label: "Date", type: "date", name: "Date", state: "date" },
      { label: "time", type: "time", name: "Time", state: "time" },

      { label: "Url", type: "url", name: "Url", state: "url" },
      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Official Announcement",
    formTitle: "Official Announcement",
    formIcon: announcement,
    formFields: [
      {
        label: "Announcement Title",
        type: "text",
        name: "Announcement Title",
        state: "title",
      },
      {
        label: "Organization Name",
        type: "text",
        name: "Organization Name",
        state: "organization",
      },
      { label: "Details", type: "textarea", name: "Details", state: "details" },
      { label: "Date", type: "date", name: "Date", state: "times" },
      { label: "Audience", type: "text", name: "Audience", state: "audience" },
      {
        label: "Url",
        type: "url",
        name: "Url",
        state: "url",
      },
      { label: "Upload file", type: "filemulti", name: "File", state: "file" },
    ],
  },
  {
    formName: "Request for Quotation",
    formTitle: "Request for Quotation",
    formIcon: quotation,
    formFields: [
      {
        label: "Quotation Name",
        type: "text",
        name: "Quotation Name",
        state: "name",
      },
      { label: "Deadline", type: "date", name: "Deadline", state: "deadline" },
      {
        label: "Details and Conditions",
        type: "textarea",
        name: "Details and Conditions",
        state: "details",
      },
      {
        label: "Email",
        type: "email",
        name: "Email",
        state: "email",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },

  {
    formName: "Researcher Story",
    formTitle: "Researcher Story",
    formIcon: story,
    formFields: [
      {
        label: "Researcher Name",
        type: "text",
        name: "Researcher Name",
        state: "name",
      },
      {
        label: "Description",
        type: "textarea",
        name: "Description",
        state: "description",
      },
      {
        label: "The Most Important Achievements",
        type: "textarea",
        name: "The Most Important Achievements",
        state: "students",
      },
      {
        label: "Available Projects",
        type: "textarea",
        name: "Available Projects",
        state: "projects",
      },
      {
        label: "Email",
        type: "email",
        name: "Email",
        state: "email",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  {
    formName: "Questionnaire",
    formTitle: "Questionnaire",
    formIcon: questionnaire,
    formFields: [
      {
        label: "Questionnaire Title",
        type: "text",
        name: "Questionnaire Title",
        state: "title",
      },
      {
        label: "Importance of questionnaire",
        type: "textarea",
        name: "Importance of questionnaire",
        state: "question",
      },
      {
        label: "Questionnaire Type",
        type: "text",
        name: "Questionnaire Type",
        state: "type",
      },
      {
        label: "Organization",
        type: "text",
        name: "Organization",
        state: "organization",
      },
      {
        label: "Questionnaire url",
        type: "url",
        name: "Questionnaire url",
        state: "url",
      },
      {
        label: "Upload file",
        type: "filemulti",
        name: "Upload file",
        state: "file",
      },
    ],
  },
  // {
  //   formName: "Add Content",
  //   formTitle: "Add Content",
  //   formIcon: "",
  //   formFields: [
  //     { label: "Project Title", type: "text", name: "Date", state: "date" },
  //     { label: "Project Type", type: "text", name: "Date", state: "date" },
  //     { label: "Details", type: "textarea", name: "Date", state: "date" },
  //     { label: "Budget", type: "text", name: "Date", state: "date" },
  //     { label: "Delivery Time", type: "text", name: "Date", state: "date" },
  //     { label: "Upload file", type: "filemulti", name: "File", state: "file" },
  //   ],
  // },
  // {
  //   formName: "Add Your Offer",
  //   formTitle: "Add Your Offer",
  //   formIcon: "",
  //   formFields: [
  //     { label: "Delivery Term", type: "text", name: "Date", state: "date" },
  //     { label: "Offer Value", type: "text", name: "Date", state: "date" },
  //     { label: "Your dues", type: "text", name: "Date", state: "date" },
  //     { label: "Details", type: "textarea", name: "Date", state: "date" },
  //   ],
  // },
  // {
  //   formName: "Add CV",
  //   formTitle: "Add CV",
  //   formIcon: "",
  //   formFields: [
  //     { label: "Name", type: "text", name: "Date", state: "date" },
  //     { label: "Age", type: "text", name: "Date", state: "date" },
  //     { label: "Job Title", type: "text", name: "Date", state: "date" },
  //     { label: "Skills", type: "text", name: "Date", state: "date" },
  //     { label: "Experience", type: "text", name: "Date", state: "date" },
  //     { label: "Upload CV", type: "filemulti", name: "Date", state: "date" },
  //   ],
  // },
];

export const categories = forms
  .filter((form) => form.formFields.some((field) => field.label.toLowerCase()))
  .map((form) => form.formName);

export const categoriesSorted = categories.sort((a, b) => a.localeCompare(b));

export const formsWithCategory = forms.map((form) => ({
  name: form.formName,
  icon: form.formIcon,
}));
