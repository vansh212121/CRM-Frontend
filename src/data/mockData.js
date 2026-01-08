export const mockPendingRequests = [
    {
        id: "req-001",
        patientName: "Sarah Mitchell",
        email: "sarah.m@email.com",
        phone: "+1 (555) 234-5678",
        submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        preferences:
            "Need an MRI for recurring migraines. Prefer afternoon slots after 2pm if possible."
    },
    {
        id: "req-002",
        patientName: "James Rodriguez",
        email: "j.rodriguez@email.com",
        phone: "+1 (555) 345-6789",
        submissionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        preferences:
            "Follow-up EEG for epilepsy monitoring. Downtown location preferred."
    },
    {
        id: "req-003",
        patientName: "Eleanor Thompson",
        email: "eleanor.t@email.com",
        phone: "+1 (555) 456-7890",
        submissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        preferences:
            "Cognitive assessment for memory concerns. Any weekday morning works."
    },
    {
        id: "req-004",
        patientName: "Michael Chen",
        email: "m.chen@email.com",
        phone: "+1 (555) 567-8901",
        submissionDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
        preferences:
            "Sleep study consultation - nights only please. Work schedule is very demanding."
    },
    {
        id: "req-005",
        patientName: "Amanda Foster",
        email: "a.foster@email.com",
        phone: "+1 (555) 678-9012",
        submissionDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        preferences:
            "Neurological consultation for chronic fatigue. Flexible on timing."
    },
    {
        id: "req-006",
        patientName: "Robert Williams",
        email: "r.williams@email.com",
        phone: "+1 (555) 789-0123",
        submissionDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
        preferences:
            "Brain mapping for research study participation. Need Harbor View specifically."
    },
    {
        id: "req-007",
        patientName: "Jennifer Park",
        email: "j.park@email.com",
        phone: "+1 (555) 890-1234",
        submissionDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        preferences:
            "Tremor assessment - Parkinson's family history. Mornings before 10am."
    },
    {
        id: "req-008",
        patientName: "David Kumar",
        email: "d.kumar@email.com",
        phone: "+1 (555) 901-2345",
        submissionDate: new Date(Date.now() - 8 * 60 * 60 * 1000),
        preferences:
            "Post-stroke rehabilitation consultation. Need wheelchair accessible facility."
    }
]

export const mockUpcomingAppointments = [
    {
        id: "apt-001",
        patientName: "Lisa Anderson",
        email: "l.anderson@email.com",
        phone: "+1 (555) 111-2222",
        confirmedDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        confirmedTime: "09:30",
        centerId: "ctr-001",
        centerName: "NeuroFlow Downtown Clinic",
        status: "confirmed", // Was 'active'
        notes: "First-time patient, bring previous MRI records"
    },
    {
        id: "apt-002",
        patientName: "Thomas Wright",
        email: "t.wright@email.com",
        phone: "+1 (555) 222-3333",
        confirmedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
        confirmedTime: "14:00",
        centerId: "ctr-003",
        centerName: "Harbor View Diagnostic Lab",
        status: "confirmed"
    },
    {
        id: "apt-004",
        patientName: "Kevin O'Brien",
        email: "k.obrien@email.com",
        phone: "+1 (555) 444-5555",
        confirmedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        confirmedTime: "10:30",
        centerId: "ctr-004",
        centerName: "Northgate Brain Health",
        status: "confirmed",
        notes: "Follow-up from previous consultation"
    },
    {
        id: "apt-006",
        patientName: "Richard Lee",
        email: "r.lee@email.com",
        phone: "+1 (555) 666-7777",
        confirmedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        confirmedTime: "08:00",
        centerId: "ctr-005",
        centerName: "Riverside Neuro Institute",
        status: "confirmed"
    }
];

export const mockConfirmedAppointments = [
    {
        id: "apt-003",
        patientName: "Maria Santos",
        email: "m.santos@email.com",
        phone: "+1 (555) 333-4444",
        confirmedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
        confirmedTime: "11:00",
        centerId: "ctr-002",
        centerName: "Westside Neuroscience Center",
        status: "completed"
    },
    {
        id: "apt-005",
        patientName: "Patricia Johnson",
        email: "p.johnson@email.com",
        phone: "+1 (555) 555-6666",
        confirmedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        confirmedTime: "15:30",
        centerId: "ctr-001",
        centerName: "NeuroFlow Downtown Clinic",
        status: "cancelled"
    },
    {
        id: "apt-007",
        patientName: "James Wilson",
        email: "j.wilson@email.com",
        phone: "+1 (555) 777-8888",
        confirmedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        confirmedTime: "09:00",
        centerId: "ctr-002",
        centerName: "Westside Neuroscience Center",
        status: "rejected",
        notes: "Patient failed pre-screening requirements"
    }

]


export const mockCenters = [
    {
        id: "ctr-001",
        name: "NeuroFlow Downtown Clinic",
        district: "Central District",
        email: "downtown@neuroflow.com",
        pincode: "10001",
        phone: "+1 (555) 100-0001",
        address: "123 Medical Plaza, Suite 400"
    },
    {
        id: "ctr-002",
        name: "Westside Neuroscience Center",
        district: "West End",
        email: "westside@neuroflow.com",
        pincode: "10025",
        phone: "+1 (555) 100-0002",
        address: "456 Health Boulevard"
    },
    {
        id: "ctr-003",
        name: "Harbor View Diagnostic Lab",
        district: "Harbor District",
        email: "harborview@neuroflow.com",
        pincode: "10038",
        phone: "+1 (555) 100-0003",
        address: "789 Waterfront Drive"
    },
    {
        id: "ctr-004",
        name: "Northgate Brain Health",
        district: "North Valley",
        email: "northgate@neuroflow.com",
        pincode: "10451",
        phone: "+1 (555) 100-0004",
        address: "321 Wellness Way"
    },
    {
        id: "ctr-005",
        name: "Riverside Neuro Institute",
        district: "Riverside",
        email: "riverside@neuroflow.com",
        pincode: "10463",
        phone: "+1 (555) 100-0005",
        address: "654 River Road"
    },
    {
        id: "ctr-006",
        name: "Summit Neurological Care",
        district: "Summit Heights",
        email: "summit@neuroflow.com",
        pincode: "10471",
        phone: "+1 (555) 100-0006",
        address: "987 Highland Avenue"
    },
    {
        id: "ctr-007",
        name: "Greenwood Memory Clinic",
        district: "Greenwood",
        email: "greenwood@neuroflow.com",
        pincode: "10034",
        phone: "+1 (555) 100-0007",
        address: "147 Forest Lane"
    },
    {
        id: "ctr-008",
        name: "Metro Spine & Brain Center",
        district: "Metro South",
        email: "metro@neuroflow.com",
        pincode: "10016",
        phone: "+1 (555) 100-0008",
        address: "258 Commerce Street"
    }
]