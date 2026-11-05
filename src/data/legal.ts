import { site } from "./site";

export type LegalTable = { head: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  /** Defined terms, rendered as a list before the clauses. */
  definitions?: { term: string; meaning: string }[];
  /** Numbered clauses (1.1, 1.2 ...). */
  clauses?: string[];
  table?: LegalTable;
  /** Highlighted callout shown after the clauses and table. */
  note?: string;
};

export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  /** Plain-language summary, 4 to 6 bullets. Not a substitute for the full text. */
  glance?: string[];
  sections: LegalSection[];
};

const N = site.name;
const D = site.domain;
const M = site.email;
const L = site.location;
const U = site.updated;

/* -------------------------------------------------------------------------- */
/*  TERMS OF SERVICE                                                          */
/* -------------------------------------------------------------------------- */

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  summary: "The rules for using this website and the foundation for every project we undertake.",
  intro: `These Terms of Service ("Terms") govern your access to and use of ${D} and form the foundation of every agreement between you and ${N} ("we", "us", "our"). We are a studio based in ${L}, led by our founder Aineah Marabi and co-founder Ian Otollo, that designs and builds websites, e-commerce stores, custom software, and CRM and ERP systems. Please read these Terms carefully. By using the Site you agree to be bound by them.`,
  glance: [
    "These Terms cover your use of this website. For project work they apply together with a signed proposal and our Engagement & Payment Terms.",
    "No contract for services exists until you accept a written proposal and pay any deposit it requires. Enquiries and quotes alone do not bind either of us.",
    "You keep ownership of your content. You own the bespoke deliverables we create for you once you have paid in full.",
    "Our liability is capped at the fees you have paid, but never for fraud, death or personal injury, or anything the law does not allow us to limit.",
    "Kenyan law governs. Disputes go to negotiation, then mediation, then arbitration in Nairobi.",
  ],
  sections: [
    {
      id: "definitions",
      title: "Definitions",
      definitions: [
        { term: "Agreement", meaning: "the contract for Services formed under clause 6, made up of the Statement of Work, the Engagement Terms and these Terms." },
        { term: "Business Day", meaning: "a day other than a Saturday, a Sunday or a public holiday in Kenya." },
        { term: "Client", meaning: "the person or organisation that enters into an Agreement with us for Services." },
        { term: "Client Content", meaning: "all text, images, data, logos, brand assets, product information and other materials that the Client or its users supply to us or upload to a system we build or operate." },
        { term: "Confidential Information", meaning: "non-public information of a commercial, technical, financial or personal nature disclosed by one party to the other, including source code, credentials, customer lists and pricing, but excluding information that is public through no fault of the recipient, already lawfully known to the recipient, or independently developed." },
        { term: "Deliverables", meaning: "the websites, software, designs, documentation and other outputs that we agree in a Statement of Work to produce for the Client." },
        { term: "Engagement Terms", meaning: `our Engagement & Payment Terms published at ${D}/engagement, as in force when the Statement of Work is accepted.` },
        { term: "Intellectual Property Rights", meaning: "copyright, database rights, trade marks, design rights, rights in confidential information and know-how, and all similar rights anywhere in the world, whether or not registered." },
        { term: "Services", meaning: "the design, development, implementation, hosting, maintenance, consulting and related services described in a Statement of Work." },
        { term: "Site", meaning: `the website at ${D} and its sub-pages, together with any interactive features on it, including the Marabi assistant.` },
        { term: "Statement of Work", meaning: "the written proposal, quotation or statement of work issued by us and accepted by the Client, setting out scope, timetable, fees and any special terms." },
        { term: "Third-Party Materials", meaning: "software, fonts, images, plug-ins, APIs, services and other materials owned by someone other than us or the Client, including open-source components." },
        { term: "Writing", meaning: "includes email and other electronic messages that can be stored and retrieved." },
      ],
    },
    {
      id: "interpretation",
      title: "Who we are and how to read these Terms",
      clauses: [
        `${N} is a studio operating from ${L}. You can contact us at ${M}.`,
        "Headings are for convenience only and do not affect interpretation. Words in the singular include the plural and the reverse. \"Including\" means \"including without limitation\".",
        "A reference to a statute is a reference to it as amended or re-enacted from time to time, together with any subsidiary legislation made under it.",
        "If these Terms conflict with a Statement of Work or the Engagement Terms, the order of precedence is: (a) the Statement of Work, but only for the specific point it addresses and only if it expressly states that it overrides; (b) the Engagement Terms; (c) these Terms.",
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance and eligibility",
      clauses: [
        "By accessing or using the Site you confirm that you have read and agree to these Terms and our Privacy Policy, Cookie Policy and Acceptable Use Policy. If you do not agree, you must stop using the Site.",
        "You must be at least 18 years old, or the age of majority where you live if different, to enter into an Agreement with us. The Site may be browsed by anyone, but it is not directed at children.",
        "If you accept these Terms or an Agreement on behalf of an organisation, you confirm that you have authority to bind that organisation, and \"you\" includes it.",
      ],
    },
    {
      id: "using-the-site",
      title: "Using the Site",
      clauses: [
        "We grant you a limited, non-exclusive, revocable, non-transferable licence to view and interact with the Site for your own lawful, non-commercial evaluation of our services.",
        "You must comply with our Acceptable Use Policy. In particular you must not attempt to gain unauthorised access to the Site or to systems connected to it, introduce malicious code, probe or test vulnerabilities except under our Security & Responsible Disclosure policy, or use the Site in a way that would be an offence under the Computer Misuse and Cybercrimes Act, 2018.",
        "We may change, suspend or withdraw any part of the Site at any time, with or without notice. We do not guarantee that the Site will be uninterrupted, timely or error-free.",
        "Information on the Site is general in nature. Case descriptions, indicative timelines, statistics and target figures are illustrations, not promises, unless repeated in a Statement of Work.",
      ],
    },
    {
      id: "communications",
      title: "Communications and notices",
      clauses: [
        `When you contact us through the Site or by email you consent to receive our replies electronically. Under Part VIA (electronic transactions) of the Kenya Information and Communications Act, an electronic communication satisfies any legal requirement for Writing.`,
        `Contact forms on the Site open your own email application with a prepared message. Nothing is sent until you press send in that application, and we do not receive it until you do.`,
        `Notices to us must be sent to ${M}. Notices to you will be sent to the email address you used to contact us or the address named in the Statement of Work. A notice sent by email is treated as received at 09:00 East Africa Time on the next Business Day after sending, unless the sender receives a delivery failure message.`,
        "You must keep your contact details current. We are not responsible for notices that do not reach you because you gave us an incorrect address or because our messages were filtered as spam.",
      ],
    },
    {
      id: "formation",
      title: "Enquiries, quotes and formation of an Agreement",
      clauses: [
        "An enquiry through the Site, a discovery call and an initial estimate are invitations to discuss a project. They do not create a binding obligation on either party.",
        "A written quotation or proposal is an offer open for acceptance for 30 days from its date, unless it states otherwise. We may withdraw it at any time before you accept it.",
        "An Agreement is formed when (a) you accept the Statement of Work in Writing, or sign it, and (b) we receive any deposit it requires. Work begins only after both have happened.",
        "The Agreement is between the Client and us. Neither of our principals is personally a party to it, and no director, employee or contractor of ours owes you a personal duty of care in connection with it, without limiting liability for fraud.",
        "Each Statement of Work is a separate Agreement. Termination or expiry of one does not affect any other.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      clauses: [
        `All content on the Site, including text, graphics, photography, the 3D ability cards, animations, code, design, the Marabi assistant, the ${N} name and logo, and the way these are selected and arranged, belongs to us or our licensors and is protected under the Copyright Act, 2001, the Trade Marks Act and equivalent laws abroad.`,
        "You may not copy, modify, distribute, sell, lease, reverse engineer or create derivative works from any part of the Site, or use our name, logo or signature, without our prior written permission, except as the law expressly allows (for example fair dealing for criticism, review or reporting).",
        "Ownership of Deliverables is governed by the Engagement Terms. In summary: on payment in full, the Intellectual Property Rights in bespoke Deliverables created specifically for the Client are assigned to the Client; our pre-existing tools, frameworks, templates and know-how remain ours and are licensed to the Client for use with the Deliverables.",
        "Feedback, ideas and suggestions you give us about the Site or our services may be used by us freely and without payment, provided we do not identify you as the source without your consent.",
      ],
    },
    {
      id: "client-content",
      title: "Client Content and warranties",
      clauses: [
        "The Client retains ownership of all Client Content and grants us a non-exclusive, worldwide, royalty-free licence to use, copy, host, adapt and display it for the sole purpose of providing the Services, and for as long as needed to do so.",
        "The Client warrants that it owns or has all rights, licences and consents necessary to supply Client Content and for us to use it as contemplated, that Client Content is lawful, and that its use as contemplated will not infringe any third party's rights, breach any duty of confidence, or contravene any law, including the Data Protection Act, 2019.",
        "The Client is responsible for the accuracy of Client Content and for legal claims, product descriptions, prices, tax treatment, delivery promises, return policies and regulatory approvals that appear on its website or system, including its obligations under the Consumer Protection Act, 2012.",
        "We may decline or remove Client Content that we reasonably believe is unlawful, infringing, defamatory, deceptive or in breach of our Acceptable Use Policy.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Materials and open source",
      clauses: [
        "Deliverables and the Site may incorporate Third-Party Materials, including open-source libraries. Each is licensed under its own terms, which prevail over these Terms for that component. Our Site credits the principal open-source components at " + D + "/licenses.",
        "We select Third-Party Materials with reasonable care, but we do not control them and give no warranty about their availability, accuracy, security or continued maintenance. Third-party service fees, including domains, hosting, SMS, email, payment-gateway and licence fees, are the Client's responsibility unless the Statement of Work states otherwise.",
        "The Site and Deliverables may link to or depend on third-party services such as payment providers (including Safaricom M-Pesa through its Daraja interface and card processors), hosting platforms and email providers. Your use of them is subject to their terms. We are not liable for their acts, omissions, outages or changes.",
        "We do not hold, pool or transmit customer funds as part of our Services. Where we build a payment flow, funds move directly between the payer and the Client's own accounts through licensed providers, and the Client is responsible for its relationship with those providers.",
      ],
    },
    {
      id: "automation-and-ai",
      title: "Automation and AI-assisted tools",
      clauses: [
        "We may use software tools, including AI-assisted tools, to help with research, code review, drafting, testing and documentation. A named person at our studio remains accountable for everything we deliver, and all code and content is reviewed by a person before it reaches you.",
        "We will not submit Client Confidential Information or personal data to an AI tool unless the provider's terms prohibit the use of that input to train its models and restrict onward disclosure, or the Client has agreed in Writing.",
        "Output from such tools can be inaccurate. You should not rely on any automated suggestion on the Site, including from the Marabi assistant, as legal, financial, tax or professional advice. A suggested scope or estimate from the assistant is not a quotation.",
        "The Marabi assistant is a guided feature that helps visitors understand our services and prepare a project brief. It is provided as a convenience. The Client or visitor remains responsible for reviewing the content of any brief before sending it.",
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio, credit and publicity",
      clauses: [
        "Unless the Statement of Work says otherwise, we may place a discreet credit line (for example \"Site by " + N + "\") in the footer of a website we deliver and may describe the project, and show non-confidential screens of it, in our portfolio and marketing.",
        "The Client may ask us in Writing to omit the credit line or to withhold a project from our portfolio. We will agree to do so for projects that are subject to a confidentiality obligation. Confidential material will never be shown.",
        "We may name the Client as a reference with its prior consent, which may be given by email.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      clauses: [
        "Each party shall keep the other's Confidential Information confidential, use it only to perform or receive the Services, protect it with at least the care it uses for its own confidential information and no less than reasonable care, and disclose it only to personnel, contractors and professional advisers who need to know it and are bound by equivalent duties.",
        "A party may disclose Confidential Information where required by law, by a court or by a competent regulator, provided it gives the other party prompt notice where lawful and discloses only what is required.",
        "These obligations continue for three years after the Agreement ends. They continue indefinitely for source code, credentials and personal data.",
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      clauses: [
        "Except as expressly set out in a Statement of Work, and to the extent the law allows, the Site is provided \"as is\" and \"as available\". We disclaim all implied warranties, including satisfactory quality, fitness for a particular purpose and non-infringement.",
        "Search ranking, traffic, conversion, sales, leads and revenue depend on factors outside our control, including competitors, search-engine algorithms and your own content and operations. Unless a Statement of Work states a specific, measurable commitment, we do not guarantee any particular outcome.",
        "Nothing in these Terms excludes or limits any right you have as a consumer under the Consumer Protection Act, 2012 that cannot lawfully be excluded or limited.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      clauses: [
        "Nothing in these Terms limits or excludes liability for fraud or fraudulent misrepresentation, for death or personal injury caused by negligence, for wilful misconduct, or for any other liability that cannot be limited or excluded under Kenyan law.",
        "Subject to clause 14.1, we are not liable, whether in contract, tort (including negligence), breach of statutory duty or otherwise, for loss of profit, revenue, business, contracts, goodwill or anticipated savings, loss or corruption of data caused by events outside our reasonable control, or any indirect or consequential loss, arising from your use of the Site or an Agreement.",
        "Subject to clause 14.1, our total aggregate liability arising out of or in connection with an Agreement is limited to the fees paid or payable by the Client under that Statement of Work in the 12 months before the event first giving rise to the claim. For a fixed-fee project, this means the total fee for that project.",
        "Our total aggregate liability to a visitor who has not entered into an Agreement, arising from use of the Site, is limited to KES 10,000.",
        "A claim must be notified in Writing, with reasonable detail, within 12 months of the date the claimant first became aware, or ought reasonably to have become aware, of the event giving rise to it.",
      ],
    },
    {
      id: "indemnities",
      title: "Indemnities",
      clauses: [
        "The Client shall indemnify us against losses, damages, costs and reasonable legal fees arising from a third-party claim that Client Content, or the Client's use of a Deliverable in breach of the Agreement, infringes that third party's rights, is unlawful, or breaches the Acceptable Use Policy.",
        "We shall indemnify the Client against losses, damages and costs awarded or agreed in settlement arising from a third-party claim that an original, bespoke Deliverable we created, used as permitted by the Agreement, infringes that third party's Intellectual Property Rights in Kenya. This indemnity does not apply to Client Content, Third-Party Materials, modifications made by anyone other than us, or use in combination with items we did not supply.",
        "A party seeking an indemnity must notify the other promptly in Writing, allow it to conduct the defence and settlement of the claim, give reasonable assistance at the indemnifier's cost, and not admit liability without consent. The indemnity in clause 15.2 is subject to the cap in clause 14.3.",
      ],
    },
    {
      id: "suspension-termination",
      title: "Suspension and termination",
      clauses: [
        "We may suspend or restrict access to the Site, and may suspend Services under an Agreement, if we reasonably believe you are in breach of these Terms or the Acceptable Use Policy, if required by law, or if an invoice is more than 14 days overdue.",
        "Either party may terminate an Agreement immediately by Writing if the other commits a material breach that is not capable of remedy, or is capable of remedy and is not remedied within 14 days of Written notice, or becomes insolvent, enters liquidation or receivership, or ceases business.",
        "The Client may also terminate for convenience on the terms in the Engagement Terms. On termination the Client must pay for Services performed and non-cancellable costs incurred up to the termination date, as set out in the Engagement Terms.",
        "On termination or expiry, licences granted to the Client over Deliverables continue only to the extent the Client has paid in full. Clauses that by their nature should continue, including those on intellectual property, confidentiality, payment, liability, indemnities and governing law, survive.",
      ],
    },
    {
      id: "force-majeure",
      title: "Events beyond our control",
      clauses: [
        "Neither party is liable for delay or failure to perform an obligation, other than an obligation to pay money, caused by an event beyond its reasonable control. Such events include power or internet outages, failure of public networks or third-party platforms, fire, flood, epidemic, civil disturbance, strike, war or terrorism, and acts or orders of government or regulators.",
        "The affected party shall notify the other promptly, use reasonable efforts to mitigate the effect, and resume performance as soon as practicable. If the event continues for more than 60 days, either party may terminate the affected Statement of Work by Written notice, and the Client shall pay for Services performed to that date.",
      ],
    },
    {
      id: "general",
      title: "General",
      clauses: [
        "Entire agreement. These Terms, the Engagement Terms and the Statement of Work form the whole agreement on their subject and replace all earlier discussions, proposals and understandings. Each party confirms it has not relied on any statement not set out in them, without limiting liability for fraud.",
        "Variation. A change to an Agreement has effect only if it is in Writing and agreed by both parties. We may change these Terms under clause 20.",
        "Assignment. The Client may not assign or subcontract its rights or obligations without our written consent. We may use subcontractors and may assign an Agreement to a successor of our business, remaining responsible for their performance.",
        "Severability. If a provision is held invalid or unenforceable, the rest remains in force, and the provision will be read down to the minimum extent necessary.",
        "No waiver. A failure or delay in exercising a right is not a waiver of it.",
        "No third-party rights. A person who is not a party has no right to enforce any term of these Terms.",
        "Relationship. Nothing creates a partnership, joint venture, agency or employment relationship between the parties.",
        "Language. These Terms are made in English. Any translation is for convenience, and the English text prevails.",
        "Electronic execution. An Agreement may be signed or accepted electronically and in counterparts, and electronic signatures are valid to the extent permitted by Part VIA of the Kenya Information and Communications Act.",
      ],
    },
    {
      id: "law-and-disputes",
      title: "Governing law and dispute resolution",
      clauses: [
        "These Terms, the Site and every Agreement, and any dispute or claim arising from them, including non-contractual disputes, are governed by the laws of Kenya.",
        "Negotiation. A party that wishes to raise a dispute must give the other Written notice describing it. Senior representatives of both parties shall meet, in person or remotely, within 7 days and try in good faith to resolve it for 21 days from the notice.",
        "Mediation. If the dispute is not resolved, the parties shall refer it to mediation before a mediator they agree, or failing agreement within 7 days, one nominated on request by the Chairperson of the Chartered Institute of Arbitrators (Kenya Branch). The mediation shall conclude within 30 days of referral, with costs shared equally.",
        "Arbitration. A dispute not settled by mediation shall be finally resolved by arbitration under the Arbitration Act, 1995, before a single arbitrator agreed by the parties or, failing agreement within 14 days, appointed on request by the Chairperson of the Chartered Institute of Arbitrators (Kenya Branch). The seat is Nairobi, the language is English, and the award is final and binding.",
        "Courts. Either party may at any time seek urgent interim or injunctive relief, or enforce an arbitral award, in the High Court of Kenya, and the parties submit to its jurisdiction for that purpose. A claim by the Client for unpaid fees that is not disputed in good faith may be pursued through the courts.",
        "If you contract as a consumer within the meaning of the Consumer Protection Act, 2012, nothing in this clause removes any right you have to approach a competent court or tribunal.",
      ],
    },
    {
      id: "changes-contact",
      title: "Changes to these Terms and contact",
      clauses: [
        `We may update these Terms to reflect changes in law, our services or our practices. The current version is always published at ${D}/terms and shows its date of last update. For visitors, continued use of the Site after a change means you accept it. A change to these Terms does not alter the terms of an Agreement already formed, except where required by law.`,
        `Questions about these Terms: ${M}. Last updated ${U}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  PRIVACY POLICY                                                            */
/* -------------------------------------------------------------------------- */

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  summary: "What personal data we collect, why we collect it, how long we keep it, and the rights you have over it.",
  intro: `${N} ("we", "us", "our") respects your privacy and processes personal data in accordance with the Data Protection Act, 2019, the Data Protection (General) Regulations, 2021 and other applicable Kenyan law. This policy explains, in plain terms and then in full, what personal data we collect through ${D} and in the course of our work, why we collect it, the lawful basis on which we rely, who we share it with, how long we keep it, how we protect it, and how you can exercise your rights.`,
  glance: [
    "We collect only what we need: the details you give us when you contact us or hire us, basic technical logs for security, and, if you allow it later, analytics.",
    "We never sell personal data, and we do not use it for advertising or profiling.",
    "Our contact forms open your own email app. The Marabi assistant stores its state and any draft brief on your device only.",
    "You can ask to see, correct, delete or move your data, object to its use, or withdraw consent, at any time, by emailing us.",
    "If we ever fall short, you can complain to us first and to the Office of the Data Protection Commissioner at any time.",
  ],
  sections: [
    {
      id: "definitions",
      title: "Definitions",
      definitions: [
        { term: "Personal data", meaning: "any information relating to an identified or identifiable natural person, as defined in the Data Protection Act, 2019." },
        { term: "Data subject", meaning: "the individual to whom personal data relates, which may be you." },
        { term: "Data controller", meaning: "the person who determines the purpose and means of processing personal data." },
        { term: "Data processor", meaning: "the person who processes personal data on behalf of a data controller." },
        { term: "Processing", meaning: "any operation performed on personal data, including collecting, recording, storing, using, sharing, restricting, erasing or destroying it." },
        { term: "Sensitive personal data", meaning: "data revealing race, health status, ethnic or social origin, conscience, belief, genetic or biometric data, property details, marital status, family details or sexual orientation, as defined in the Act. We do not ask for it." },
        { term: "Data Commissioner", meaning: "the Data Protection Commissioner, who heads the Office of the Data Protection Commissioner (ODPC), the Kenyan regulator under the Act." },
      ],
    },
    {
      id: "who-is-responsible",
      title: "Who is responsible for your data",
      clauses: [
        `For personal data collected through the Site, from prospective clients and from our own business dealings (suppliers, invoicing and records), ${N} is the data controller. We operate from ${L}.`,
        "For personal data that a client's own customers, staff or users place into a system we build, host or support (for example an e-commerce store or CRM), the client is the data controller and we act as its data processor. Section 13 explains how we handle that data.",
        `Privacy questions, requests and complaints go to ${M}, marked \"Privacy\". Our principals, Aineah Marabi (Founder) and Ian Otollo (Co-Founder), are responsible for data protection at the studio.`,
      ],
    },
    {
      id: "what-we-collect",
      title: "The data we collect",
      table: {
        head: ["Category", "Examples", "Where it comes from"],
        rows: [
          ["Identity and contact", "Name, email address, telephone number, organisation, job title", "You, when you write to us, speak with us or sign an agreement"],
          ["Project and enquiry details", "What you want built, an optional budget range, timelines, links to existing sites, and the project brief you complete on our Start a project page", "You"],
          ["Contract and billing", "Billing name and address, invoices, payment references (M-Pesa transaction codes, bank transfer references), tax details you give us for invoicing", "You, and your bank or payment provider when you pay us"],
          ["Communications", "Emails, call notes, meeting recordings only with your agreement, and project messages", "You and us"],
          ["Technical and security", "IP address, browser and device type, pages requested, date and time, referring page, and error records", "Your browser, automatically, recorded in server logs"],
          ["On-device preferences", "Your cookie choice and the state of the Marabi assistant, held in your browser storage (see our Cookie Policy)", "Your device, not sent to us"],
          ["Analytics (only if you consent, not yet active)", "Pages viewed, approximate location from IP, device characteristics, how long you stayed", "Your browser, only after you click Allow"],
        ],
      },
      note: "We do not knowingly collect sensitive personal data, national identity or passport numbers, bank card details or passwords. Please do not send them to us. Card payments on websites we build are handled by licensed payment providers, not by us.",
    },
    {
      id: "how-we-collect",
      title: "How we collect it",
      clauses: [
        "Directly from you: when you email or call us, complete the enquiry form, attend a discovery call, sign a Statement of Work or pay an invoice.",
        "Automatically: when you use the Site, our hosting infrastructure records standard server logs. These are used only for security, reliability and troubleshooting.",
        `Through the enquiry form: the form on the Site prepares an email in your own email application addressed to ${M}. Our Site does not transmit or store what you type unless and until you send that email.`,
        "From third parties: occasionally from a referrer who introduces you to us, or from public sources such as your organisation's website. We use such information only to respond to you and tell you where we obtained it if you ask.",
      ],
    },
    {
      id: "purposes",
      title: "Why we use it and our lawful basis",
      table: {
        head: ["Purpose", "Lawful basis (Data Protection Act, 2019, s.30)", "Data used"],
        rows: [
          ["Respond to an enquiry, hold a discovery call, and prepare a proposal", "Steps at your request before entering a contract; our legitimate interest in answering enquiries", "Identity and contact; project details; communications"],
          ["Perform a contract: design, build, host, support and invoice", "Performance of a contract with you", "Identity and contact; contract and billing; communications"],
          ["Keep accounting, tax and other records the law requires", "Compliance with a legal obligation", "Contract and billing"],
          ["Secure the Site, detect abuse and fix faults", "Our legitimate interest in the security and reliability of our systems, which does not override your rights", "Technical and security"],
          ["Remember your cookie choice and assistant state on your device", "Strictly necessary or functional storage you have requested; see Cookie Policy", "On-device preferences"],
          ["Measure and improve how the Site is used (when activated)", "Your consent, which you can refuse or withdraw at any time", "Analytics"],
          ["Send you news or offers about our services", "Your consent only; every message has an unsubscribe link", "Identity and contact"],
          ["Establish, exercise or defend legal claims; enforce our agreements", "Our legitimate interest, and legal obligation where a court or authority requires it", "As relevant to the claim"],
        ],
      },
      note: "We do not sell personal data, we do not share it with advertisers, and we do not carry out profiling or solely automated decision-making that produces legal or similarly significant effects for you.",
    },
    {
      id: "consent",
      title: "Consent",
      clauses: [
        "Where we rely on your consent, it will be specific, informed and given by a clear affirmative action, such as clicking \"Allow\" on the cookie banner or ticking a marketing box. We do not use pre-ticked boxes or treat silence as consent.",
        "Refusing or withdrawing consent never affects your access to the Site or to our services. You can withdraw consent at any time using the Cookie settings link in the footer or the unsubscribe link in any email, or by writing to us. Withdrawal does not affect processing carried out before you withdrew.",
      ],
    },
    {
      id: "assistant",
      title: "The Marabi assistant and on-device storage",
      clauses: [
        "The Marabi assistant is a guided feature on the Site that helps you understand our services and prepare a project brief. It runs in your browser.",
        "The assistant keeps its state, such as whether it is awake and which prompts you have dismissed, and any draft brief you create, in your browser's local storage on your own device. We cannot see this data and it is not sent to us or to any third party by the assistant.",
        "A brief reaches us only if you choose to send it, through the enquiry form, which opens your email application. You can delete the stored data at any time by clearing this site's data in your browser settings.",
        "If we change the assistant so that it processes your conversation on a server or with a third-party service, we will update this policy before enabling that change, explain what is processed and by whom, and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "sharing",
      title: "Who we share personal data with",
      clauses: [
        "Service providers acting on our instructions under written terms: hosting and infrastructure providers, email and communication tools, accounting and invoicing software, document-signing tools, and payment providers such as Safaricom (M-Pesa) and banks. They may use the data only to provide their service to us.",
        "Professional advisers such as lawyers, accountants, auditors and insurers, who are bound by duties of confidentiality.",
        "Courts, regulators and law-enforcement authorities, where we are legally required to disclose or where it is necessary to establish, exercise or defend legal claims.",
        "A buyer or successor of our business, if it is sold or reorganised, who must honour this policy and give you notice of any material change.",
        "We do not otherwise disclose personal data. We do not permit processors to use it for their own purposes.",
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside Kenya",
      clauses: [
        "Some of our providers store or process data outside Kenya. We transfer personal data out of Kenya only as permitted by sections 48 to 50 of the Data Protection Act, 2019: where the recipient country or provider offers appropriate safeguards for the protection of personal data, such as binding contractual terms; where you have consented after being informed of the risks; or where another condition in the Act is met.",
        "Where Kenyan law requires certain personal data to be processed in Kenya, for example in connection with strategic interests of the State or certain categories of sensitive data, we will keep it in Kenya.",
        `You may ask us where your data is held and what safeguards apply by writing to ${M}.`,
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      table: {
        head: ["Data", "Retention period", "Why"],
        rows: [
          ["Enquiries that do not become projects", "12 months from our last contact, then deleted", "To respond to follow-ups and reconsider your project"],
          ["Client contracts, invoices and payment records", "7 years after the end of the engagement", "Statutory tax and accounting record-keeping and limitation periods for contract claims"],
          ["Project communications and files", "Duration of the engagement and 12 months after, then deleted or returned, unless a longer period is agreed", "Support and warranty queries"],
          ["Server and security logs", "Up to 90 days", "Security investigation and fault finding"],
          ["Marketing contact details", "Until you unsubscribe, after which we keep only a minimal suppression record so we do not email you again", "To honour your opt-out"],
          ["Analytics data (when activated)", "Up to 14 months", "Year-on-year comparison"],
          ["On-device preferences and draft briefs", "Stored only on your device until you clear them; we hold no copy", "Convenience"],
        ],
      },
      note: "When a retention period ends we delete the data or irreversibly anonymise it. Backups roll off within 35 days of deletion from live systems.",
    },
    {
      id: "security",
      title: "How we protect personal data",
      clauses: [
        "We apply technical and organisational measures appropriate to the risk, as the Data Protection Act, 2019 requires, including data protection by design and by default. These include encryption in transit using TLS, access limited to those who need it, multi-factor authentication on administrative accounts, regular software updates and dependency review, separate environments for development and production, and routine backups.",
        "Everyone who may access personal data on our behalf is bound by a duty of confidentiality. We review our measures at least annually and when our systems change.",
        "More detail, and how to report a vulnerability, is in our Security & Responsible Disclosure policy.",
      ],
    },
    {
      id: "breach",
      title: "Personal data breaches",
      clauses: [
        "If a personal data breach occurs, we will contain it, assess the risk to individuals, and record it.",
        "Where we are the controller and the breach is likely to result in a real risk of harm to your rights and freedoms, we will notify the Data Commissioner within 72 hours of becoming aware of it, as section 43 of the Data Protection Act, 2019 requires, and will notify you without unreasonable delay, describing what happened, the likely consequences, the measures we have taken, and what you can do to protect yourself.",
        "Where we are a processor for a client, we will notify the client without undue delay, and in any event within 48 hours of confirming the breach, so that it can meet its own obligations.",
      ],
    },
    {
      id: "processor-role",
      title: "When we are your processor",
      clauses: [
        "When we act as a processor for a client, we will: process personal data only on the client's documented instructions; keep it confidential; apply appropriate security measures; engage sub-processors only under written terms that give the same protections, and tell the client who they are on request; help the client respond to data subject requests and to breaches and impact assessments; and, when the engagement ends, delete or return the data at the client's choice within 60 days unless the law requires us to keep it.",
        "The client is responsible for having a lawful basis to give us the data, for the notices it gives its own customers, and for registering with the Data Commissioner where the Act requires it to do so.",
        "These commitments form part of the Engagement Terms and any Statement of Work, and a separate data processing agreement is available on request.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      table: {
        head: ["Your right", "What it means", "How to use it"],
        rows: [
          ["To be informed", "To know what we do with your data and why (section 26(a))", "Read this policy, or ask us a question"],
          ["Access", "To receive a copy of the personal data we hold about you (section 26(b))", "Email us. We may ask you to confirm your identity first"],
          ["Object", "To object to processing based on our legitimate interest, and to direct marketing at any time (section 26(c))", "Email us or use an unsubscribe link"],
          ["Correction", "To have false or misleading data corrected without delay (section 26(d))", "Email us with the correction"],
          ["Deletion", "To have data erased where we no longer need it, where you withdraw consent, or where we hold it unlawfully (section 26(e))", "Email us"],
          ["Data portability", "To receive your data you gave us in a structured, commonly used, machine-readable format, or have it sent to another controller (section 38)", "Email us, naming what you want moved and where"],
          ["Withdraw consent", "To withdraw consent you gave, at any time", "Cookie settings in the footer, an unsubscribe link, or email us"],
          ["Not to be subject to automated decisions", "To not be subject to a decision based solely on automated processing that has legal or significant effects (section 35)", "We do not make such decisions, but you can ask us to confirm"],
        ],
      },
      note: "These rights are subject to the limits in the Act. For example, we may keep data we are legally required to keep, or data we need to defend a legal claim, and we will tell you if that is the case.",
    },
    {
      id: "exercising-rights",
      title: "How we handle your requests",
      clauses: [
        `Send your request to ${M}, marked "Privacy", saying what you want and giving enough detail for us to find your data. We may ask for information to verify your identity, and for authority if someone is acting on your behalf.`,
        "We respond promptly, and in any event within the time the Data Protection (General) Regulations, 2021 and the Act require. We aim to reply within seven days. If a request is complex and we need longer, we will tell you why and when to expect a full response.",
        "We do not charge a fee unless a request is manifestly unfounded or excessive, in which case we will explain our reasons and may charge a reasonable administrative fee or decline, as the law allows.",
        "If we refuse a request, we will give you our reasons in writing and tell you how to complain.",
      ],
    },
    {
      id: "children",
      title: "Children",
      clauses: [
        "The Site and our services are for businesses and adults. We do not knowingly collect personal data from a child, meaning a person under 18, without the consent of a parent or guardian, as section 33 of the Data Protection Act, 2019 requires.",
        "If you believe a child has given us personal data, please tell us at the address above and we will delete it.",
      ],
    },
    {
      id: "automated-decisions",
      title: "Automated decision-making",
      clauses: [
        "We do not use personal data for solely automated decision-making that has legal or similarly significant effects on you, and we do not build profiles of visitors for advertising.",
        "The Marabi assistant offers guided suggestions based on the choices you make in it. Its output is a convenience, not a decision about you, and a person at our studio makes every decision about proposals and pricing.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      clauses: [
        "We use only a small amount of browser storage to remember your cookie choice and the state of the Marabi assistant. We do not use advertising cookies. Analytics, if we activate it, will load only after you consent.",
        `Details of each item, what it does and how long it lasts are in our Cookie Policy at ${D}/cookies.`,
      ],
    },
    {
      id: "third-party-links",
      title: "Links to other websites",
      clauses: [
        "The Site may link to websites run by others, including social media platforms and messaging services such as WhatsApp and Instagram. When you follow a link, the other site's privacy practices apply, not ours. We encourage you to read their policies. We are not responsible for them.",
      ],
    },
    {
      id: "complaints",
      title: "Complaints",
      clauses: [
        `If you are unhappy with how we have handled your personal data, please contact us first at ${M}. We will investigate and reply in writing.`,
        "You also have the right to lodge a complaint with the Data Commissioner at the Office of the Data Protection Commissioner of Kenya, under section 56 of the Data Protection Act, 2019, at any time and whether or not you have first contacted us.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      clauses: [
        `We will post any change on this page with a new date. If a change materially affects data we already hold, we will tell you directly, for example by email. Last updated ${U}.`,
      ],
      table: {
        head: ["Date", "Change"],
        rows: [[U, "Policy rewritten and expanded; added the Marabi assistant, retention table and rights table."]],
      },
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  COOKIE POLICY                                                             */
/* -------------------------------------------------------------------------- */

export const cookies: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  summary: "Exactly what browser storage this website uses, why, for how long, and how you stay in control.",
  intro: `This policy explains how ${N} uses cookies and similar technologies, such as your browser's local storage, on ${D}. It lists every item we use, in plain terms, so you can see what is stored on your device and why. It should be read with our Privacy Policy.`,
  glance: [
    "We use two small items of browser storage: one remembers your cookie choice, the other remembers how you use the Marabi assistant.",
    "Both are stored only on your device, in local storage, and neither is used to track you across other websites.",
    "We do not use advertising or cross-site tracking cookies and we do not sell data.",
    "Analytics is not switched on. If we add it, it will load only after you click Allow, and not before.",
    "You can change your choice at any time with the Cookie settings link in the footer.",
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "What cookies and similar technologies are",
      clauses: [
        "Cookies are small text files that a website places on your device through your browser. Similar technologies, such as local storage, serve the same purpose: they let a website remember something about your visit.",
        "Some storage is essential for a site to work. Some remembers your preferences. Some measures how a site is used. Some is used for advertising. We only use the first two kinds, and we describe each item below.",
      ],
    },
    {
      id: "our-approach",
      title: "Our approach",
      clauses: [
        "We follow a simple rule: we store on your device only what we need to provide what you have asked for, and nothing that follows you elsewhere on the internet.",
        "Where storage is not strictly necessary, we will ask for your consent first, in line with the Data Protection Act, 2019. Consenting is a choice, and refusing never limits your access to the Site.",
      ],
    },
    {
      id: "what-we-use",
      title: "Storage we use today",
      table: {
        head: ["Name", "Type", "What it does", "Category", "Duration", "Set by"],
        rows: [
          ["mmi-consent", "Local storage", "Records whether you chose Allow or No thanks on the cookie banner, so we do not ask on every page", "Strictly necessary", "Until you clear your browser data", "Us (first party)"],
          ["mmi-bot", "Local storage", "Remembers the state of the Marabi assistant (for example whether it is asleep or awake, or that you chose to hide it), so it behaves the way you left it", "Functional, used only to provide the assistant you choose to use", "Until you clear your browser data", "Us (first party)"],
          ["mmi-brief", "Local storage", "Saves the draft of your project brief while you fill it in, so you can come back to it. It is deleted when you send the brief or choose Start fresh", "Functional, used only to provide the form you choose to use", "Until you send the brief, start fresh, or clear your browser data", "Us (first party)"],
          ["mmi-bot-hello, mmi-bot-form-hello, mmi-dwell", "Session storage", "Remember that the assistant has already greeted you or explained a topic during this visit, so it does not repeat itself", "Functional", "Until you close the tab", "Us (first party)"],
        ],
      },
      note: "Nothing in this table is sent to us. It stays in your browser on your device. If you clear your browser data for this site, both items are deleted.",
    },
    {
      id: "strictly-necessary",
      title: "Why consent is not needed for these items",
      clauses: [
        "The consent record is strictly necessary: without it we could not honour your choice. We use it on the basis of our legitimate interest in respecting your preferences, and it contains no personal data beyond your choice.",
        "The assistant's storage is functional. It exists only because you chose to use a feature that needs to remember your progress, and it never leaves your device. If you prefer, you can avoid it by not using the assistant, or by clearing the site's data after your visit.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics: not currently active",
      clauses: [
        "We do not currently run analytics on the Site, and no analytics script is loaded.",
        "If we decide to add privacy-conscious analytics to understand which pages are useful, it will load only after you click Allow on the cookie banner. If you click No thanks, or do nothing, it will not load. We will configure it to anonymise IP addresses and will not use it for advertising.",
        "Before we switch analytics on, we will update this policy with the provider's name, the cookies or storage it sets, and their duration, and the cookie banner will ask for your choice again.",
      ],
      table: {
        head: ["Category", "Status", "Condition"],
        rows: [
          ["Strictly necessary", "In use", "Always on; required for the Site to respect your choice"],
          ["Functional (assistant)", "In use", "Only when you use the Marabi assistant"],
          ["Analytics", "Not active", "Will load only after you click Allow"],
          ["Advertising and targeting", "Never used", "None. We do not use them"],
        ],
      },
    },
    {
      id: "what-we-dont-use",
      title: "What we do not use",
      clauses: [
        "We do not use advertising, retargeting or cross-site tracking cookies, tracking pixels from advertising networks, or fingerprinting techniques designed to identify you across sites.",
        "We do not sell, rent or trade data collected through cookies or similar storage.",
      ],
    },
    {
      id: "fonts-and-embeds",
      title: "Fonts, embeds and third-party content",
      clauses: [
        "The fonts used on the Site are bundled and served from our own domain. Your browser does not contact a font provider when the page loads.",
        "The Site currently embeds no third-party widgets, videos or social feeds that set their own cookies. Links to external services such as WhatsApp or Instagram take you to those services, and their own cookie policies then apply.",
        "If we add embedded third-party content in future, it will be disclosed here and will not set non-essential cookies without your consent.",
      ],
    },
    {
      id: "server-logs",
      title: "Server logs",
      clauses: [
        "Separately from cookies, our hosting infrastructure records standard server logs when a page is requested, including your IP address, browser type, the page requested and the time. We use these only for security, reliability and fault-finding and keep them for up to 90 days, as described in our Privacy Policy.",
      ],
    },
    {
      id: "managing-choices",
      title: "Managing your choices",
      clauses: [
        "To change your cookie choice, use the Cookie settings link in the footer of any page. The banner will appear again and you can choose Allow or No thanks.",
        "To remove stored items, clear this site's data in your browser. In most browsers, open Settings, find Privacy or Site settings, choose the option to view site data, search for this site's domain, and delete its stored data.",
        "You can also configure your browser to block or warn you about cookies and local storage. Because our storage is minimal and strictly necessary or functional, blocking it will not affect your ability to read the Site, though the cookie banner may reappear on each visit and the assistant will not remember your progress.",
      ],
    },
    {
      id: "signals",
      title: "Browser signals",
      clauses: [
        "We do not track you across websites, so there is nothing for a Do Not Track or Global Privacy Control signal to switch off. If we later introduce analytics, we will treat such signals as a refusal.",
      ],
    },
    {
      id: "legal-basis",
      title: "Legal basis",
      clauses: [
        "Where storage involves personal data, we rely on your consent under the Data Protection Act, 2019, except for strictly necessary storage and functional storage you have asked for, which we use on the basis of legitimate interest. You have the rights described in our Privacy Policy, including the right to withdraw consent at any time.",
      ],
    },
    {
      id: "changes",
      title: "Changes and contact",
      clauses: [
        `We will update this policy if the storage we use changes, and will show the date. Last updated ${U}. Questions about cookies and storage: ${M}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  ENGAGEMENT & PAYMENT TERMS                                                */
/* -------------------------------------------------------------------------- */

export const engagement: LegalDoc = {
  slug: "engagement",
  title: "Engagement & Payment Terms",
  summary: "How projects are scoped, priced, paid for, reviewed, delivered, supported and ended.",
  intro: `These Engagement & Payment Terms ("Engagement Terms") apply to every project between ${N} ("the Studio") and the client named in the Statement of Work ("the Client"), together with our Terms of Service. They set out how we scope, price, build, deliver and support our work, and what each side can expect of the other. They are written to be read and understood.`,
  glance: [
    "Everything starts with a written Statement of Work: scope, timeline, fee and milestones. Anything not in it is out of scope until a change is agreed in writing.",
    "A deposit (normally 50%) starts the work. The balance follows milestones, and the final payment is due before go-live.",
    "You review and accept each deliverable through a structured acceptance process, and we fix defects reported within 30 days of go-live at no charge.",
    "On final payment you own the bespoke code, design and content we made for you. We keep our own tools and you get a licence to use them.",
    "You can cancel at any time. You pay for work done plus a small, stated kill fee after design approval.",
  ],
  sections: [
    {
      id: "definitions",
      title: "Definitions",
      definitions: [
        { term: "Statement of Work (SOW)", meaning: "the written proposal accepted by the Client that describes the Services, Deliverables, Milestones, timetable and Fees." },
        { term: "Milestone", meaning: "a stage of the project defined in the SOW, usually linked to the delivery or approval of a Deliverable and to a payment." },
        { term: "Fees", meaning: "the amounts payable under the SOW, exclusive of VAT and third-party costs unless stated otherwise." },
        { term: "Change Request", meaning: "a written request by either party to alter the scope, Deliverables, timetable or Fees in the SOW." },
        { term: "Go-Live", meaning: "the date the Deliverable is first made available to the public or put into production use by the Client." },
        { term: "Warranty Period", meaning: "the period of 30 days starting on Go-Live, or on delivery where there is no Go-Live." },
        { term: "Support Plan", meaning: "an optional ongoing maintenance and support arrangement described in clause 15 and the SOW." },
        { term: "Business Day", meaning: "a day other than a Saturday, a Sunday or a public holiday in Kenya. Business hours are 08:00 to 17:00 East Africa Time." },
      ],
    },
    {
      id: "precedence",
      title: "Formation and order of precedence",
      clauses: [
        "These Engagement Terms are incorporated into each SOW. A binding agreement is formed on the terms set out in the Terms of Service: when the Client accepts the SOW in Writing and pays any deposit due.",
        "If there is a conflict, the SOW prevails over these Engagement Terms, and these Engagement Terms prevail over the Terms of Service, but only on the specific point and only where the SOW expressly states that it is overriding.",
      ],
    },
    {
      id: "scope-and-change",
      title: "Scope and change control",
      clauses: [
        "The Services, Deliverables, Milestones, timetable and Fees are those in the SOW. Anything not described in it is out of scope.",
        "Either party may request a change by sending a Change Request in Writing. We will assess it and respond within five Business Days, stating the effect on Fees, timetable and Deliverables.",
        "A change takes effect only when the Client approves the Change Request in Writing. We are not obliged to carry out out-of-scope work without an approved Change Request, and work done at the Client's request without one may be charged at our then-current hourly rate.",
        "Minor adjustments that do not materially affect effort, cost or timetable do not need a formal Change Request. We decide in good faith whether an adjustment is minor, and will tell you if we think it is not.",
      ],
    },
    {
      id: "timetable",
      title: "Timetable and Client dependencies",
      clauses: [
        "Timetables in a SOW are estimates made in good faith based on information supplied at the time, and depend on the Client doing what it needs to do on time.",
        "The Client shall nominate one authorised representative to give instructions and approvals; provide Client Content, brand assets, access, credentials and decisions within the periods in the SOW or, if none, within five Business Days of request; and give feedback on a Deliverable within five Business Days of delivery.",
        "If the Client delays, the timetable extends by at least the period of delay, and we may reschedule our resources. If the project is stalled by the Client for more than 30 days, we may close it on Written notice and invoice for Services performed up to that point.",
      ],
    },
    {
      id: "fees-and-payment",
      title: "Fees, deposit and milestones",
      clauses: [
        "Fees are stated in Kenya Shillings (KES) unless the SOW says otherwise, and are fixed for the scope in the SOW. Estimates for time-and-materials work are not caps unless the SOW says they are.",
        "A deposit is payable on acceptance of the SOW before work begins. The deposit secures our capacity and covers initial work, and is non-refundable except as stated in clause 18.4.",
        "Unless the SOW states a different schedule, Fees are payable on this default schedule:",
      ],
      table: {
        head: ["Stage", "Share of Fees", "Due"],
        rows: [
          ["Acceptance of SOW", "50%", "Before work starts"],
          ["Design approval (or equivalent mid-project Milestone)", "30%", "On delivery of the Milestone for approval"],
          ["Final delivery", "20%", "Before Go-Live and before source code, credentials and administrative access are handed over"],
        ],
      },
      note: "Time-and-materials, retainer and Support Plan fees are invoiced monthly in arrears unless the SOW says otherwise.",
    },
    {
      id: "vat-and-taxes",
      title: "VAT and taxes",
      clauses: [
        "Fees are exclusive of Value Added Tax and any other applicable tax or levy. Where VAT applies, it is charged at the prevailing rate, currently 16% under the Value Added Tax Act, 2013, and shown separately on the invoice.",
        "The Client is responsible for any withholding tax it is required to deduct by law and shall give us the withholding certificate. If tax is withheld without a lawful basis, the Client shall pay us the amount needed so that we receive the full Fees.",
      ],
    },
    {
      id: "payment-mechanics",
      title: "How to pay",
      clauses: [
        "We accept payment by bank transfer and by M-Pesa, to the account, Paybill number or Till number shown on the invoice we issue. Payment is complete when cleared funds are received in that account.",
        "We will never ask you to pay to an account that is not shown on an invoice we issued, or to change payment details by message alone. If you receive a request that looks unusual, confirm it with us by phone on a number you already know before paying. We are not responsible for money paid to an account not shown on our invoice.",
        "The payer bears bank, mobile-money and transfer charges, so that the amount we receive equals the amount invoiced. Please quote the invoice number as the payment reference, and send us proof of payment where the reference is not clear.",
        "Invoices are payable within seven days of the invoice date unless the SOW says otherwise. We issue invoices and receipts electronically.",
      ],
    },
    {
      id: "late-payment",
      title: "Late payment, suspension and disputed invoices",
      clauses: [
        "Overdue amounts attract interest at 1.5% per month, or part of a month, from the due date until payment, to the extent the law allows.",
        "If an invoice is more than 14 days overdue, we may, after seven days' Written notice, suspend Services and withhold Deliverables, source code, credentials and administrative access until it is paid. Any resulting delay is not our breach, and the timetable extends accordingly.",
        "If the Client disputes an invoice in good faith it must notify us in Writing within seven days of the invoice date, explaining the reason and the amount disputed. The Client shall pay the undisputed portion on time. We will respond to a dispute within five Business Days, and the parties will work to resolve it under the dispute process in the Terms of Service.",
        "We may recover reasonable costs of collecting overdue amounts, including legal fees and collection costs, to the extent the law allows.",
      ],
    },
    {
      id: "third-party-costs",
      title: "Third-party costs and subscriptions",
      clauses: [
        "Costs charged by others, such as domain names, hosting, premium plug-ins and licences, stock images and fonts, SMS and email delivery, and payment-gateway or mobile-money transaction fees, are not included in the Fees unless the SOW says so.",
        "Where practicable, we ask the Client to purchase these directly in its own name so that it owns and controls them. Where we buy on the Client's behalf, we pass the cost through at cost, with evidence on request, and may require payment in advance for large or non-cancellable items.",
        "Third parties may change their prices or terms. We are not liable for those changes and will tell the Client promptly when we become aware of one that affects the project.",
      ],
    },
    {
      id: "acceptance",
      title: "Review and acceptance testing",
      clauses: [
        "We will tell the Client in Writing when a Deliverable or Milestone is ready for review and provide access to a staging or review environment.",
        "The Client has seven Business Days from that notice to test the Deliverable against the SOW and to give a written list of defects. A defect is a failure of the Deliverable to conform materially to the SOW. A difference of opinion on taste, or a request for something not in the SOW, is a Change Request, not a defect.",
        "We will correct reported defects within a reasonable time, depending on severity: critical defects (the Deliverable cannot be used for its main purpose or is insecure) within three Business Days; major defects within seven Business Days; minor defects in the next scheduled release. We will then re-submit the Deliverable, and the Client has a further three Business Days to confirm the fix.",
        "A Deliverable is accepted on the earliest of: (a) the Client's written approval; (b) the expiry of the review period without a written defect list; and (c) use of the Deliverable in production by the Client. The number of review rounds included is stated in the SOW. Extra rounds are charged as a Change Request.",
      ],
    },
    {
      id: "warranty",
      title: "Warranties and defect cover",
      clauses: [
        "We warrant that we will perform the Services with reasonable skill and care, using suitably qualified people, and that bespoke Deliverables will conform materially to the SOW during the Warranty Period.",
        "During the Warranty Period we will correct, at no charge, any defect that is reported in Writing and that is not an excluded matter.",
        "The warranty does not cover: changes made by anyone other than us; defects caused by Client Content, Third-Party Materials or third-party service changes; problems caused by misuse, unauthorised access to the Client's accounts, or failure to follow our instructions; compatibility with browsers, devices or systems not agreed in the SOW; or requests for new features.",
        "Except as stated, and to the extent the law allows, we give no other warranty. In particular we do not warrant that a Deliverable will be uninterrupted or error-free, or that it will achieve a particular search ranking, traffic or sales outcome.",
      ],
    },
    {
      id: "ownership",
      title: "Ownership, licences and open source",
      clauses: [
        "On payment in full of all Fees due under the SOW, we assign to the Client the Intellectual Property Rights in the bespoke Deliverables created specifically for the Client, including design files, custom code and written content authored by us. Until then, we grant the Client a limited licence to use the Deliverables for the purposes agreed, and we retain ownership.",
        "We retain ownership of our pre-existing and general-purpose materials: tools, frameworks, libraries, templates, components, scripts, methods and know-how, whether created before or during the project and not created specifically for the Client. We grant the Client a perpetual, worldwide, non-exclusive, royalty-free licence to use, copy and modify them as part of the Deliverables, but not to resell them on their own.",
        "Third-Party Materials, including open-source components, remain subject to their own licences. We will list the principal ones in the handover documentation. The Client agrees to comply with those licences. We will not knowingly include open-source components under a licence that would require the Client to publish its own proprietary source code without telling the Client first.",
        "We retain the right to reuse general skills, knowledge, learnings and non-confidential techniques gained during the project.",
      ],
    },
    {
      id: "client-data",
      title: "Client data and data processing",
      clauses: [
        "The Client owns its data. Where we process personal data for the Client, the Client is the data controller, we are its data processor, and we comply with the commitments listed in our Privacy Policy, including processing only on documented instructions, confidentiality, appropriate security, sub-processor controls, assistance with data subject requests and breaches, and deletion or return on exit.",
        "The Client shall make sure it has a lawful basis for giving us the data, that its notices to individuals are adequate, and that it has registered with the Data Commissioner where the Data Protection Act, 2019 requires it to.",
        "A separate data processing agreement is available on request and, once signed, forms part of the SOW.",
      ],
    },
    {
      id: "hosting",
      title: "Environments and hosting",
      clauses: [
        "We build on a private development environment and share work with the Client on a staging environment. Neither is a public service, and neither is covered by a service level.",
        "Unless the SOW says we host the production system, the Client is responsible for hosting, and we will help it set up hosting in the Client's own account so that it controls its own infrastructure.",
        "Where we host the production system under the SOW, we use reputable infrastructure providers, take daily backups kept for 30 days, and monitor availability. Hosting fees, and the support level for hosted systems, are stated in the SOW. We do not guarantee uninterrupted availability, and the providers' own terms apply.",
      ],
    },
    {
      id: "support",
      title: "Support and maintenance",
      clauses: [
        "After the Warranty Period we have no continuing duty to host, monitor, update or support a Deliverable unless the Client has taken a Support Plan. Software ages: platforms, libraries and security conditions change, so we recommend one.",
        "A Support Plan is described in the SOW or in a separate order. The standard tiers are set out in the table below. Fees are stated in the SOW, and response times are targets measured in business hours, not guarantees.",
      ],
      table: {
        head: ["Tier", "Coverage hours", "Critical incident response", "Standard request response", "Included hours per month"],
        rows: [
          ["Essential", "Business Days, 08:00 to 17:00 EAT", "Within 1 Business Day", "Within 3 Business Days", "2"],
          ["Standard", "Business Days, 08:00 to 17:00 EAT", "Within 4 business hours", "Within 2 Business Days", "6"],
          ["Priority", "Monday to Saturday, 07:00 to 20:00 EAT", "Within 2 hours", "Within 1 Business Day", "15"],
        ],
      },
      note: "A critical incident is one where the system is unavailable or a security issue puts data at risk. Unused included hours do not roll over unless the SOW says so. Work beyond the included hours is charged at the agreed hourly rate.",
    },
    {
      id: "confidentiality-non-solicit",
      title: "Confidentiality and non-solicitation",
      clauses: [
        "Each party shall protect the other's Confidential Information as set out in the Terms of Service.",
        "During the engagement and for 12 months after it ends, the Client shall not directly solicit for employment or engagement any of our personnel or contractors who worked on its project, without our written consent. This does not prevent general advertising not targeted at our people, or hiring someone who approaches the Client unprompted. We give the same undertaking to the Client about its personnel.",
      ],
    },
    {
      id: "publicity",
      title: "Portfolio, testimonials and case studies",
      clauses: [
        "Unless the Client notifies us in Writing before Go-Live, we may describe the project, show non-confidential screens of it and place a credit line on a delivered website, as set out in the Terms of Service.",
        "We will ask for the Client's approval before publishing a testimonial or a detailed case study that names the Client, includes figures or quotes the Client's staff. Approval may be given by email, and withdrawn for future use at any time.",
      ],
    },
    {
      id: "termination-and-kill-fee",
      title: "Cancellation, kill fee and termination",
      clauses: [
        "The Client may cancel a project at any time by Written notice. On cancellation the Client shall pay for all Services performed up to the cancellation date, calculated against the Milestones and, for work in progress, at our agreed rates, together with any non-cancellable third-party costs committed on its behalf.",
        "If the Client cancels after design approval and before Go-Live, it shall also pay a kill fee of 15% of the unbilled balance of the Fees, reflecting the capacity we reserved and could not reassign. No kill fee is payable if the Client cancels before design approval, or if it terminates for our uncured material breach.",
        "Either party may terminate immediately by Written notice for the other's material breach that is not remedied within 14 days of notice, or for insolvency, as set out in the Terms of Service.",
        "The deposit is non-refundable, except where we terminate other than for the Client's breach, or the Client terminates for our uncured material breach, in which case we will refund the portion of Fees paid that relates to work not yet delivered.",
        "On termination we will hand over the work completed and paid for, together with source code, assets and credentials relating to the paid-for portion, within 10 Business Days of cleared payment of all amounts due.",
      ],
    },
    {
      id: "exit-handover",
      title: "Handover and end of engagement",
      clauses: [
        "At Go-Live, and again on termination, we provide a handover covering source code in a repository or archive, environment and build instructions, a list of the principal open-source components and their licences, administrative accounts transferred to the Client, and documentation of significant configuration. We aim to do this through a recorded walkthrough.",
        "We will not hold the Client's code, domains, accounts or data hostage. Our right to withhold items is limited to amounts due and unpaid under the clauses above.",
        "Within 60 days after the engagement ends, unless the Client asks us in Writing to keep them or the law requires, we delete or return Client Content and personal data from our systems, and confirm in Writing on request.",
      ],
    },
    {
      id: "liability-and-law",
      title: "Liability, disputes and general terms",
      clauses: [
        "Our liability is limited as set out in the Terms of Service. Disputes are resolved under the negotiation, mediation and arbitration process in the Terms of Service, governed by the laws of Kenya, with arbitration seated in Nairobi.",
        "The SOW, these Engagement Terms and the Terms of Service form the whole agreement and replace earlier discussions. Any change must be in Writing and agreed by both parties. Electronic signatures and email approvals are valid under Part VIA of the Kenya Information and Communications Act.",
        `We may update these Engagement Terms. A change does not alter a SOW already accepted, unless it is required by law. The current version is published at ${D}/engagement. Last updated ${U}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  ACCEPTABLE USE POLICY                                                     */
/* -------------------------------------------------------------------------- */

export const acceptableUse: LegalDoc = {
  slug: "acceptable-use",
  title: "Acceptable Use Policy",
  summary: "What is and is not allowed on our website, in our assistant, and on systems we build or host.",
  intro: `This Acceptable Use Policy ("AUP") sets out the rules for using ${D}, the Marabi assistant, and any website, application or system that ${N} builds, hosts or operates. It exists to keep our services safe, lawful and reliable for everyone. It forms part of our Terms of Service, and a breach of it is a breach of those Terms.`,
  glance: [
    "Use our website, assistant and hosted systems lawfully and in good faith.",
    "Do not attack, probe or overload our systems, and do not use automation or the assistant to abuse them.",
    "Do not use anything we build or host for fraud, harassment, spam, malware, infringing content or other unlawful activity.",
    "If you find a security problem, report it to us under our disclosure policy instead of testing it yourself.",
    "We respond to breaches in steps, from a warning to suspension, and we tell you why.",
  ],
  sections: [
    {
      id: "scope",
      title: "Purpose and scope",
      clauses: [
        `This AUP applies to everyone who uses the Site at ${D}, anyone who interacts with the Marabi assistant, our clients, and the users of any system that we host, manage or operate for a client ("Hosted Systems").`,
        "Where we have built a system that the Client hosts itself, the Client is responsible for how that system is used and for enforcing its own rules. We recommend that every system we build has an acceptable use policy of its own, and we can help prepare one.",
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      definitions: [
        { term: "Abuse", meaning: "any use that breaches this AUP, the law, or the rights of others." },
        { term: "Hosted Systems", meaning: "websites, applications, databases and other systems that we host, manage or operate for a Client." },
        { term: "Malicious code", meaning: "software or scripts designed to disrupt, damage, gain unauthorised access to, or steal data from, a system or person." },
        { term: "Automated access", meaning: "access by a script, bot, crawler or other tool rather than by a person using a browser in the ordinary way." },
        { term: "You", meaning: "any person or organisation using the Site, the assistant or a Hosted System." },
      ],
    },
    {
      id: "principles",
      title: "General principles",
      clauses: [
        "You must use our services lawfully, honestly and with respect for others. You must comply with all laws that apply to you and to your use of our services, including the Computer Misuse and Cybercrimes Act, 2018, the Data Protection Act, 2019, the Copyright Act, 2001, the Consumer Protection Act, 2012 and the Penal Code.",
        "You must not use our services in a way that harms us, our clients, other users, our infrastructure or our providers, or that could reasonably be expected to.",
        "Where a rule is unclear, ask us. We would rather answer a question than resolve a problem.",
      ],
    },
    {
      id: "prohibited-content",
      title: "Prohibited content",
      clauses: [
        "You must not upload, publish, transmit or store, through our services or on a Hosted System, content that: is unlawful, defamatory, threatening, harassing or abusive; infringes copyright, trade marks or other intellectual property; contains or promotes child sexual abuse material, which we report to the authorities; incites violence, hatred or discrimination; is obscene or sexually explicit without lawful purpose and appropriate controls; or discloses another person's personal data without a lawful basis.",
        "You must not use our services to publish false or misleading information in a way that deceives consumers, including false product claims, fake reviews, fake prices or counterfeit goods, or to sell goods or services whose sale is unlawful or restricted in Kenya without the required licences.",
        "Content that is unlawful, harmful or infringing may be removed without notice where we reasonably need to act quickly to prevent harm.",
      ],
    },
    {
      id: "prohibited-conduct",
      title: "Prohibited conduct",
      clauses: [
        "You must not attempt to gain unauthorised access to the Site, to any system, account, network or data connected to it, or to other users' accounts, or help anyone else to do so.",
        "You must not introduce Malicious code; interfere with or disrupt the operation of our services, for example by denial-of-service attacks or by excessive requests; bypass or circumvent security, rate limits, access controls or consent mechanisms; or use our services to attack others.",
        "You must not scan, probe or test the vulnerability of our systems except in line with our Security & Responsible Disclosure policy, which provides a safe way to do so.",
        "You must not reverse engineer, decompile or extract source code from the Site or Hosted Systems except as the law allows, or copy the Site's design, 3D cards or code to pass them off as your own.",
        "You must not impersonate any person, including our principals, or misrepresent your relationship with us, or use our name or logo in a way that suggests we endorse you.",
      ],
    },
    {
      id: "automated-access",
      title: "Automated access and the assistant",
      clauses: [
        "You may browse the Site normally, and ordinary search-engine crawlers that respect our robots.txt file are welcome. You must not scrape the Site, or use automated access at a rate or in a way that degrades the service for others.",
        "The Marabi assistant is provided for individuals who want help understanding our services and preparing a project brief. You must not use it to send spam, automate enquiries, probe for hidden instructions or internal data, attempt to make it behave in ways it was not designed to, or overload it.",
        "We may limit, throttle or block access that we reasonably believe is automated abuse.",
      ],
    },
    {
      id: "spam",
      title: "Messages, spam and marketing",
      clauses: [
        "You must not use our services, or a Hosted System, to send unsolicited bulk or commercial messages, or messages that are deceptive, harassing or contain Malicious code, whether by email, SMS, WhatsApp or any other channel.",
        "Direct marketing to individuals requires a lawful basis and a working opt-out. The Data Protection Act, 2019 gives individuals the right to object to direct marketing, and you must honour that right promptly. Where we build messaging tools for you, you are responsible for obtaining and recording consent from recipients.",
      ],
    },
    {
      id: "payments-fraud",
      title: "Payments, fraud and financial crime",
      clauses: [
        "You must not use a Hosted System or a payment flow we build to commit or facilitate fraud, money laundering, terrorist financing, pyramid or Ponzi schemes, unlicensed deposit-taking or investment solicitation, or to process payments for goods or services you are not entitled to sell.",
        "You must comply with the terms of your payment providers, including Safaricom for M-Pesa, and with applicable anti-money-laundering laws. We may suspend a payment integration if we reasonably suspect misuse, and we may be required to report suspicious activity to the authorities.",
        "You must not attempt to defraud us, for example by chargebacks made in bad faith, forged proof of payment, or misrepresenting your identity or authority.",
      ],
    },
    {
      id: "hosted-systems",
      title: "Additional rules for Hosted Systems",
      clauses: [
        "If we host a system for you, you remain responsible for its content, for the lawfulness of its use, and for the actions of your users. You must keep your administrator credentials secure and tell us at once if you suspect they have been compromised.",
        "You must not use a Hosted System to host content or services unrelated to the work we agreed, run cryptocurrency mining, operate an open relay or proxy, or consume resources in a way that affects other clients on the same infrastructure.",
        "We may apply reasonable resource limits to Hosted Systems and will tell you before we do so unless we need to act urgently to protect the service.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Respect for intellectual property",
      clauses: [
        "You must have the right to use any content, image, font, music, code or other material you supply to us or place on a Hosted System. We will remove content that we are told, in good faith, infringes copyright or other rights, and we may suspend repeat infringers.",
        "To report infringing content, write to us at the address below with: your contact details; a description of the work and where it appears; a statement that you are the owner or authorised to act for them, and that the use is not authorised; and your signature or name. We will review the notice promptly and may share it with the person who uploaded the content.",
      ],
    },
    {
      id: "reporting",
      title: "Reporting a breach",
      clauses: [
        `If you see content or conduct that breaches this AUP, tell us at ${M} with the subject "AUP report". Please include the address of the page or system, a description of what you saw, and any screenshots.`,
        "If you have found a security weakness, please do not test it further. Report it under our Security & Responsible Disclosure policy.",
        "We will acknowledge reports within three Business Days and tell you what action, if any, we have taken, subject to confidentiality and legal limits.",
      ],
    },
    {
      id: "enforcement",
      title: "Enforcement",
      clauses: [
        "We take a proportionate approach. Depending on the seriousness, we may: ask you to stop and explain the problem; remove or disable content; limit or throttle access; suspend an account or system; and, in serious or repeated cases, terminate our services under the Terms of Service.",
        "We may act immediately and without notice where necessary to protect people, our systems or the law, for example for illegal content, an active attack or a security risk.",
        "We may preserve evidence and report illegal activity to the police, the Directorate of Criminal Investigations, the Data Commissioner or other authorities, and cooperate with lawful requests.",
        "If we suspend or terminate your access, we will tell you why, unless the law prevents us, and you may reply in Writing and ask us to review our decision. We will respond within seven Business Days.",
      ],
    },
    {
      id: "liability",
      title: "Responsibility and liability",
      clauses: [
        "You are responsible for what you do with our services and for any loss or damage you cause. You agree to indemnify us as set out in the Terms of Service for claims arising from your breach of this AUP.",
        "We do not monitor all content and are not liable for content that others place on Hosted Systems. Our rights under this AUP do not create a duty to monitor or to act.",
      ],
    },
    {
      id: "changes",
      title: "Changes and contact",
      clauses: [
        `We may update this AUP as the law, our services and the risks change. The current version is at ${D}/acceptable-use. Last updated ${U}. Questions: ${M}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  SECURITY & RESPONSIBLE DISCLOSURE                                         */
/* -------------------------------------------------------------------------- */

export const security: LegalDoc = {
  slug: "security",
  title: "Security & Responsible Disclosure",
  summary: "How we protect the systems and data we handle, and how to report a vulnerability to us safely.",
  intro: `Security is part of how ${N} designs, builds and runs software, not an afterthought. This page describes how we protect the data and systems we are trusted with, how we respond when something goes wrong, and how security researchers and users can report a vulnerability to us safely and be treated fairly.`,
  glance: [
    "We design for security from the start: least privilege, encryption in transit, multi-factor authentication, regular updates and tested backups.",
    "If something goes wrong, we contain it, tell affected clients within 48 hours of confirming it, and notify the regulator within 72 hours where the law requires.",
    `If you find a vulnerability, email ${M} with the subject "Security report". We acknowledge within three Business Days.`,
    "Good-faith research that follows our rules is welcome. We will not pursue legal action against you for it.",
    "We do not currently offer a monetary bounty, but we are glad to credit you if you wish.",
  ],
  sections: [
    {
      id: "commitment",
      title: "Our commitment",
      clauses: [
        "We treat the security of client systems and the personal data they hold as a core professional duty. We aim to build systems that are secure by design and by default, in line with section 41 of the Data Protection Act, 2019, and to be open about how we do it.",
        "Our principals, Aineah Marabi (Founder and Lead Software Developer) and Ian Otollo (Co-Founder and Developer), are accountable for security at the studio.",
      ],
    },
    {
      id: "scope",
      title: "Scope",
      clauses: [
        `This policy applies to ${D} and its sub-pages, and to systems that we host or operate for clients, to the extent the client has agreed in the Statement of Work. It also covers our internal systems and accounts.`,
        "Systems that a client hosts itself are the client's responsibility, but we are glad to receive a report about a weakness in work that we built, and we will pass it to the client and help fix it.",
        "Third-party services we use, such as hosting platforms, payment providers and email services, are run by their owners. Please report problems in them to those owners, and tell us if they affect our clients.",
      ],
    },
    {
      id: "definitions",
      title: "Definitions",
      definitions: [
        { term: "Vulnerability", meaning: "a weakness in a system, process or configuration that could be exploited to compromise confidentiality, integrity or availability." },
        { term: "Researcher", meaning: "a person who reports a vulnerability to us in good faith." },
        { term: "Security incident", meaning: "an event that compromises, or is reasonably likely to compromise, the confidentiality, integrity or availability of systems or data." },
        { term: "Business Day", meaning: "a day other than a Saturday, a Sunday or a public holiday in Kenya." },
      ],
    },
    {
      id: "how-we-protect",
      title: "How we protect systems and data",
      table: {
        head: ["Area", "What we do"],
        rows: [
          ["Encryption", "TLS for all data in transit. Encryption at rest where the platform supports it, and always for backups of production data and for stored secrets."],
          ["Access control", "Least privilege: people get only the access they need, reviewed regularly and removed promptly when roles end. Role-based access in the systems we build."],
          ["Authentication", "Multi-factor authentication on administrative, cloud, source-control, email and domain accounts. Unique strong passwords held in a password manager. No shared accounts."],
          ["Secure development", "Code review, dependency review and updates, separation of development, staging and production, no production data in development, and secrets kept out of source code."],
          ["Testing", "Automated checks on every change and manual review of authentication, authorisation, input handling and payment flows before launch."],
          ["Backups and recovery", "For systems we host, daily backups kept for 30 days, stored separately from production, and restored in tests to confirm they work."],
          ["Monitoring", "Availability and error monitoring, and review of unusual access and administrative activity."],
          ["Devices and people", "Studio devices use disk encryption, screen locks and security updates. Everyone with access is bound by a duty of confidentiality."],
          ["Suppliers", "We choose suppliers with sound security practices and review them when they change, and require data-protection terms where they handle personal data."],
        ],
      },
    },
    {
      id: "secure-delivery",
      title: "Secure delivery on client projects",
      clauses: [
        "For each project we identify the data it will hold and the risks it faces, choose controls to match, and document them in the handover. Payment flows are built to use licensed providers, so card details and M-Pesa credentials never pass through or rest in our code or the Client's database.",
        "We transfer administrative accounts and secrets to the Client at handover and recommend that the Client rotate credentials once the project goes live and whenever a person with access leaves.",
        "Security issues found during the warranty period are treated as critical defects under the Engagement Terms.",
      ],
    },
    {
      id: "incident-response",
      title: "If something goes wrong",
      clauses: [
        "We follow a simple incident process: detect and assess; contain and preserve evidence; remove the cause and recover; notify; and review to prevent a recurrence.",
        "Where a security incident affects a client's data, we will notify the client without undue delay, and in any event within 48 hours of confirming it, saying what we know, what we are doing, and what the client should do.",
        "Where we are the data controller, we will notify the Data Commissioner within 72 hours of becoming aware of a breach that is likely to result in a risk to individuals, as section 43 of the Data Protection Act, 2019 requires, and will notify the individuals concerned without unreasonable delay.",
        "After a significant incident we give the affected client a written summary covering cause, impact, actions taken and steps to prevent a repeat.",
      ],
    },
    {
      id: "reporting",
      title: "How to report a vulnerability",
      clauses: [
        `Email ${M} with the subject "Security report". If you would like to send encrypted details, say so in a first message and we will arrange a secure channel.`,
        "Please include: the system and address affected; a description of the vulnerability and its likely impact; clear steps to reproduce it, or a proof of concept; your contact details; and whether you want to be credited.",
        "Please give us a reasonable time to fix the problem before you disclose it publicly. We ask for at least 90 days from your report, and will talk to you if we need longer or if the issue is being actively exploited.",
      ],
    },
    {
      id: "our-promises",
      title: "What you can expect from us",
      clauses: [
        "We will acknowledge your report within three Business Days, assess it and tell you whether we accept it as a vulnerability within seven Business Days, and then update you at least every 14 days until it is resolved.",
        "We will fix confirmed issues according to severity, using the targets below, and tell you when it is fixed. We will treat your report and your identity as confidential unless you agree to be named or the law requires disclosure.",
      ],
      table: {
        head: ["Severity", "Examples", "Target for a fix or mitigation"],
        rows: [
          ["Critical", "Remote code execution, authentication bypass, exposure of personal data at scale", "Mitigation within 72 hours; full fix within 14 days"],
          ["High", "Privilege escalation, stored cross-site scripting on authenticated pages, access to another user's data", "Within 30 days"],
          ["Medium", "Reflected cross-site scripting, cross-site request forgery on sensitive actions, information disclosure of limited impact", "Within 60 days"],
          ["Low", "Minor misconfiguration or low-impact issues", "Within 90 days or the next scheduled release"],
        ],
      },
      note: "These are targets, not guarantees. Fix times depend on the complexity of the problem and, for third-party components, on the supplier.",
    },
    {
      id: "safe-harbour",
      title: "Safe harbour",
      clauses: [
        "If you make a good-faith effort to follow this policy, we will consider your research to be authorised, we will work with you to understand and resolve the issue, and we will not take or support legal action against you for it, including under the Computer Misuse and Cybercrimes Act, 2018, in respect of the research we have authorised.",
        "This safe harbour applies only to our own systems and to research that stays within the rules below. It cannot authorise access to systems owned by others, and we cannot bind third parties or the authorities. If a third party takes action against you for research done in compliance with this policy, we will say publicly that your research was authorised.",
      ],
    },
    {
      id: "rules",
      title: "Rules of engagement",
      clauses: [
        "Test only against accounts and data you own or that we have given you permission to use. Do not access, modify, copy or delete data that is not yours, and stop and tell us at once if you reach personal data or sensitive information.",
        "Use the minimum testing needed to show the problem. Do not degrade the service for others, disrupt availability or leave backdoors. Do not use automated scanners at a rate that affects service.",
        "Do not demand payment or conditions in return for a report, or threaten to publish a vulnerability to pressure us. Do not share the vulnerability with others before we have had a reasonable chance to fix it.",
        "Comply with the law, and with our Acceptable Use Policy.",
      ],
    },
    {
      id: "out-of-scope",
      title: "Out of scope",
      clauses: [
        "The following are not accepted as vulnerabilities, although we are glad to hear about them as suggestions: denial-of-service attacks and volumetric testing; social engineering, phishing or physical attacks against our people, clients or premises; spam or social-media issues; vulnerabilities in third-party services we do not control; missing security headers, cookie flags or best-practice settings with no demonstrable impact; descriptions of software versions without a working exploit; and the content of public pages that is visible by design.",
        "Testing of client-hosted systems is out of scope unless the client has given written permission.",
      ],
    },
    {
      id: "recognition",
      title: "Recognition",
      clauses: [
        "We do not currently run a paid bug-bounty programme and cannot offer monetary rewards. We are happy to thank you by name, with your consent, once an issue is resolved, and to give you a written confirmation of the report.",
      ],
    },
    {
      id: "shared-responsibility",
      title: "What we ask of clients and visitors",
      clauses: [
        "Security is shared. Clients should use strong, unique passwords and multi-factor authentication on the accounts we hand over, restrict administrator rights, remove access for people who leave, keep devices updated, and tell us at once if they suspect a compromise.",
        "Please be alert to payment-fraud and impersonation attempts. We will never ask you to pay to an account that is not shown on an invoice we issued, or to share a password or one-time code. If something looks unusual, confirm with us by phone before acting.",
      ],
    },
    {
      id: "contact",
      title: "Contact and review",
      clauses: [
        `Security reports and questions: ${M}, subject "Security report". We review this policy at least annually and after any significant incident. Last updated ${U}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  ACCESSIBILITY STATEMENT                                                   */
/* -------------------------------------------------------------------------- */

export const accessibility: LegalDoc = {
  slug: "accessibility",
  title: "Accessibility Statement",
  summary: "Our commitment to a website everyone can use, what we have done, what still falls short, and how to tell us.",
  intro: `${N} is committed to making ${D} usable by as many people as possible, including people with visual, hearing, motor or cognitive disabilities and people using assistive technology. We build accessible websites for our clients, so we hold ourselves to the same standard. This statement explains our target, what we have done, where we still fall short, and how to ask for help.`,
  glance: [
    "We are working to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.",
    "The site works with a keyboard, has a skip link, labels its forms, and respects reduced-motion settings.",
    "The 3D cards and the Marabi assistant have non-motion and keyboard alternatives.",
    "A few things still fall short, and we list them honestly below.",
    "Tell us if something is hard to use, and we will help and fix it.",
  ],
  sections: [
    {
      id: "commitment",
      title: "Our commitment",
      clauses: [
        "We believe the web should be usable by everyone. Our target is conformance with the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and we treat this as an ongoing process rather than a box ticked once.",
        "This commitment is consistent with the Constitution of Kenya, which recognises the rights of persons with disabilities, and with the Persons with Disabilities Act, 2003, which promotes access to information and services.",
      ],
    },
    {
      id: "scope",
      title: "Scope",
      clauses: [
        `This statement covers the Site at ${D}, including its pages, forms, the 3D ability cards, the services index, the contact buttons and the Marabi assistant.`,
        "It does not cover websites and systems we build for clients, which are governed by their own requirements, or third-party sites to which we link.",
      ],
    },
    {
      id: "definitions",
      title: "Terms used",
      definitions: [
        { term: "WCAG 2.2 AA", meaning: "the international technical standard for web accessibility published by the World Wide Web Consortium (W3C), level AA, which is the widely accepted benchmark." },
        { term: "Assistive technology", meaning: "software or hardware that helps people use a computer, such as screen readers, magnifiers, voice control and switch devices." },
        { term: "Reduced motion", meaning: "an operating-system or browser setting that asks websites to limit animation and movement." },
      ],
    },
    {
      id: "measures",
      title: "What we have done",
      clauses: [
        "Structure and navigation: we use semantic HTML, a logical heading order, descriptive link text, landmarks, and a skip-to-content link that appears when you press Tab.",
        "Keyboard use: all interactive elements, including menus, the services index, the contact form, dialogs and the card controls, can be reached and operated with the keyboard, with a visible focus indicator. Dialogs close with the Escape key and return you to the page.",
        "Colour and text: text and interface elements are designed to meet the WCAG minimum contrast ratios in the dark theme, and information is not conveyed by colour alone. Text can be resized and the layout reflows at narrow widths and on small screens without loss of content.",
        "Forms: each field has a label or accessible name, required fields are marked, and the form works with the keyboard and with screen readers.",
        "Motion: we honour your reduced-motion setting. When it is on, the loading sequence is skipped, the logo marquee stops, the typewriter text appears at once, and smooth scrolling and decorative animation are switched off.",
        "Images and media: informative images have text alternatives, and decorative images are hidden from assistive technology.",
      ],
    },
    {
      id: "interactive-features",
      title: "Interactive features",
      clauses: [
        "3D ability cards: the cards are drawn in a graphics canvas. They have a text description giving the person's name and role, a keyboard-operable Flip button as an alternative to dragging or tapping, and a fallback image where the browser cannot display 3D graphics. They tilt with the pointer, but movement is switched off if you prefer reduced motion.",
        "Services index: each service opens and closes on hover, on focus and on tap or click, and exposes its open or closed state to assistive technology. Each service also has a plain link to its own page, so nothing depends on the open or closed state.",
        "Marabi assistant: the assistant is built to be operable by keyboard, to announce new messages to screen readers, to avoid trapping focus, and to be dismissed at any time. It limits its animation if you prefer reduced motion.",
        "Scroll-driven sections: the introductions of the founders appear one after another as you scroll. While an introduction is on screen, its name, role and tagline are available as text to assistive technology.",
      ],
    },
    {
      id: "known-issues",
      title: "Known limitations",
      table: {
        head: ["Area", "Limitation", "What you can do"],
        rows: [
          ["3D ability cards", "The skill bars on the card faces are part of the graphic and are not exposed one by one to screen readers. The card's description gives the person's name and role.", "Use the person's introduction text and the About page, or ask us for the card's details in text"],
          ["Scroll-driven introductions", "The pinned, scroll-driven introductions can feel long with some assistive technologies and at high zoom levels.", "Use the skip link, the headings or the links in the navigation to move on, or ask us for the content as plain text"],
          ["Third-party content", "Linked services such as WhatsApp and Instagram have their own accessibility, which we do not control.", "Contact us by email instead"],
        ],
      },
      note: "We are working on these. If one of them affects you, tell us. We will give you the information another way and treat your report as a priority.",
    },
    {
      id: "compatibility",
      title: "Compatibility",
      clauses: [
        "The Site is designed to work with the current versions of the Chrome, Edge, Firefox and Safari browsers on desktop and mobile, and with common assistive technologies including screen readers such as NVDA, JAWS, VoiceOver and TalkBack, and with browser zoom and operating-system text scaling.",
        "It relies on the HTML, CSS, JavaScript and WAI-ARIA standards. The 3D cards additionally use WebGL, and the fallback described above is used where it is not available.",
      ],
    },
    {
      id: "testing",
      title: "How we check",
      clauses: [
        "We check accessibility as we build: automated checks during development, manual keyboard testing, checks with browser zoom and reduced-motion settings, and manual review of headings, labels and focus order. We re-check when we make significant changes.",
        "Automated tools find only a part of the issues, so we do not claim full conformance on that basis alone. We publish the limitations we know about in this statement.",
      ],
    },
    {
      id: "client-work",
      title: "Accessibility in the work we build for clients",
      clauses: [
        "We design client websites and systems to meet WCAG 2.2 AA unless a Statement of Work says otherwise, and check key journeys, such as navigation, forms and checkout, with a keyboard and a screen reader before launch.",
        "A client that adds content to its site after launch is responsible for keeping that content accessible, for example by adding text alternatives to images. We can train the Client's team on this at handover.",
      ],
    },
    {
      id: "feedback",
      title: "Tell us about a problem",
      clauses: [
        `If you have difficulty using any part of the Site, or need information in another format, please contact us at ${M} with the subject "Accessibility". Tell us the page, what you were trying to do, the problem you met, and the browser and assistive technology you use, if you are happy to.`,
        "We will acknowledge your message within three Business Days, and aim to give you the information or help you need within 10 Business Days. We will tell you what we plan to do to fix the underlying issue and, where we can, when.",
        "You may ask for any content from the Site in an alternative format, such as plain text, large print or a different structure, and we will provide it free of charge where reasonably practicable.",
      ],
    },
    {
      id: "escalation",
      title: "If you are not satisfied",
      clauses: [
        "If you are not happy with our response, please tell us and we will review it, with the founder, within seven Business Days.",
        "You may also seek advice or assistance from the National Council for Persons with Disabilities (NCPWD) in Kenya, which promotes and protects the rights of persons with disabilities.",
      ],
    },
    {
      id: "review",
      title: "Review and dates",
      clauses: [
        `We review this statement at least once a year, and whenever we make significant changes to the Site. This statement was last updated on ${U}.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Registry                                                                  */
/* -------------------------------------------------------------------------- */

export const legalDocs = {
  terms,
  privacy,
  cookies,
  engagement,
  "acceptable-use": acceptableUse,
  security,
  accessibility,
} as const;

/** Ordered list for navigation, footers and sitemaps. */
export const legalList: { slug: string; title: string; summary: string }[] = [
  terms,
  privacy,
  cookies,
  engagement,
  acceptableUse,
  security,
  accessibility,
].map(({ slug, title, summary }) => ({ slug, title, summary }));

