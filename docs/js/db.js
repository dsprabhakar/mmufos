let supabase = null;

if (USE_DATABASE && window.supabase && window.supabase.createClient) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const localUsers = {
  'rajesh': {
    password: 'raj123', name: 'Rajesh Kumar',
    totalAdvance: 250000, nonAllocated: 75000,
    advanceDate: '2024-06-15',
    allocations: [
      { property: 'BIS CH5', sqft: 3, amount: 90000, rentPerMonth: 450, allocatedDate: '2024-07-01', certNo: 'FOS-BCH-2024-0041' },
      { property: 'Adyar Grand Square', sqft: 25, amount: 80000, rentPerMonth: 400, allocatedDate: '2024-08-10', certNo: 'FOS-AGS-2024-0018' }
    ]
  },
  'priya': {
    password: 'priya123', name: 'Priya Sharma',
    totalAdvance: 500000, nonAllocated: 120000,
    advanceDate: '2024-03-20',
    allocations: [
      { property: 'T. Nagar Heritage Hub', sqft: 50, amount: 205000, rentPerMonth: 1025, allocatedDate: '2024-04-05', certNo: 'FOS-TNH-2024-0009' },
      { property: 'BIS CH5', sqft: 5, amount: 150000, rentPerMonth: 750, allocatedDate: '2024-05-15', certNo: 'FOS-BCH-2024-0055' }
    ]
  },
  'kumar': {
    password: 'kumar123', name: 'Kumar S',
    totalAdvance: 180000, nonAllocated: 180000,
    advanceDate: '2025-01-10',
    allocations: []
  },
  'anitha': {
    password: 'anitha123', name: 'Anitha R',
    totalAdvance: 750000, nonAllocated: 50000,
    advanceDate: '2023-11-05',
    allocations: [
      { property: 'Anna Nagar Sky Residences', sqft: 100, amount: 360000, rentPerMonth: 1800, allocatedDate: '2023-12-01', certNo: 'FOS-ANS-2023-0003' },
      { property: 'Velachery Prime Plaza', sqft: 80, amount: 224000, rentPerMonth: 1120, allocatedDate: '2024-01-20', certNo: 'FOS-VPP-2024-0012' },
      { property: 'Adyar Grand Square', sqft: 40, amount: 116000, rentPerMonth: 580, allocatedDate: '2024-03-10', certNo: 'FOS-AGS-2024-0027' }
    ]
  },
  'demo': {
    password: 'demo', name: 'Demo User',
    totalAdvance: 200000, nonAllocated: 170000,
    advanceDate: '2025-06-01',
    allocations: [
      { property: 'BIS CH5', sqft: 1, amount: 30000, rentPerMonth: 150, allocatedDate: '2025-07-15', certNo: 'FOS-BCH-2025-0102' }
    ]
  }
};

async function authenticateUser(username, password) {
  if (supabase) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password_hash', password)
      .single();

    if (error || !user) return null;

    const { data: allocations } = await supabase
      .from('allocations')
      .select('*, properties(name)')
      .eq('user_id', user.id)
      .eq('status', 'active');

    return {
      username: user.username,
      name: user.name,
      role: user.role,
      totalAdvance: parseFloat(user.total_advance),
      nonAllocated: parseFloat(user.non_allocated),
      advanceDate: user.advance_date,
      allocations: (allocations || []).map(a => ({
        property: a.properties.name,
        sqft: a.sqft,
        amount: parseFloat(a.amount),
        rentPerMonth: parseFloat(a.rent_per_month),
        allocatedDate: a.allocated_date,
        certNo: a.cert_no
      }))
    };
  }

  const user = localUsers[username];
  if (user && user.password === password) {
    return {
      username,
      name: user.name,
      role: 'customer',
      totalAdvance: user.totalAdvance,
      nonAllocated: user.nonAllocated,
      advanceDate: user.advanceDate,
      allocations: user.allocations || []
    };
  }
  return null;
}

async function fetchProperties() {
  if (supabase) {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('id');
    return data || [];
  }
  return [];
}
