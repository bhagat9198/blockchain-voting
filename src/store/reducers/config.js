const initialState = {
  states: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ],
  t_c: [
    "One must be above 18 years of age",
    "One must be a Citizen of India",
    "You can cast just one vote.",
    "You can vote only at your registered constituency.",
    "You must have Voter ID or EPIC card or photo identity election card."
  ]
}

const configRed = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default configRed;