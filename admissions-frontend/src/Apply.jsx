import React, { useState, useRef } from 'react';

export default function Apply() {
  const [form, setForm] = useState({
    givenName: '',
    familyName: '',
    nationality: '',
    gender: '',
    dob: '',
    phone: '',
    streetAddress: '',
    country: '',
    stateProvince: '',
    city: '',
    postalCode: '',
    academicTerm: '',
    academicYear: '',
    englishTest: '',
    other: '',
    testScore: '',
    gpa: ''
  });

  const [transcriptFile, setTranscriptFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [testResultFile, setTestResultFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const transcriptInputRef = useRef(null);
  const idInputRef = useRef(null);
  const testResultInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (transcriptFile) formData.append('transcriptFile', transcriptFile);
    if (idFile) formData.append('idFile', idFile);
    if (testResultFile) formData.append('testResultFile', testResultFile);

    const res = await fetch('https://globalacademy.onrender.com/apply', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setMessage('Submission failed.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p>Your application has been submitted successfully.</p>
      </div>
    );
  }

  const inputClass = "w-full p-2 border rounded";

  const fileUploader = (label, file, setFile, refEl, accept = ".pdf,.jpg,.jpeg,.png") => (
    <div className="pb-4">
      <h1 className="pb-1">{label}</h1>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept={accept}
          ref={refEl}
          onChange={e => setFile(e.target.files[0])}
          className="hidden"
        />
        <div className="flex-1 p-2 border rounded truncate text-gray-500 border-black" title={file ? file.name : ''}>
          {file ? file.name : 'No file chosen'}
        </div>
        <button
          type="button"
          onClick={() => refEl.current.click()}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );

  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto px-4 space-y-4 pt-10" encType="multipart/form-data">
      <img 
        src="https://res.cloudinary.com/ds5k6edzv/image/upload/v1750454494/Screenshot_2025-06-20_at_17.21.22_ezphrn.png"
        className="h-14 object-cover"
      />
      <img 
        src="https://res.cloudinary.com/ds5k6edzv/image/upload/v1750454245/image_szty6d.jpg"
        className="w-full h-64 object-cover"
      />
      {message && <p className="text-red-600">{message}</p>}
      <div className="pt-6">
        <div className="flex items-center space-x-4 pb-2">
          <div className="flex-grow border-t-2 border-green-500"></div>
          <h2 className="text-xl font-semibold text-gray-800">Student Information</h2>
          <div className="flex-grow border-t-2 border-green-500"></div>
        </div>
      </div>
      {[
        { name: 'givenName', label: 'Given Name' },
        { name: 'familyName', label: 'Family Name' },
      ].map(({ name, label, type = 'text', ...rest }) => (
        <div key={name}>
          <h1 className="pb-1">{label} <span className="text-red-600">*</span></h1>
          <input
            className={inputClass}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            {...rest}
          />
        </div>
      ))}

      <div>
        <h1 className="pb-1">Nationality <span className="text-red-600">*</span></h1>
        <select
          name="nationality"
          className="w-full p-2 border rounded"
          value={form.nationality}
          onChange={handleChange}
          required
        >
          <option value="">Select your country</option>
          {[
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
            "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
            "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
            "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
            "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
            "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
            "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
            "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
            "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
            "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
            "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
            "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
            "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
            "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
            "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
            "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
            "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
            "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
            "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
            "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
            "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
            "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
            "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
            "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
            "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
            "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
            "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
            "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
          ].map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div>
        <h1 className="pb-1">Gender <span className="text-red-600">*</span></h1>
        <select
          name="gender"
          className="w-full p-2 border rounded"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select your gender </option>
          {[
            "Male", "Female", "Other", "Prefer not to say"
          ].map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
            
          ))}
        </select>
      </div>

      {[
        { name: 'dob', label: 'Date of Birth', type: 'date' },
        { name: 'phone', label: 'Phone Number' },
        { name: 'streetAddress', label: 'Street Address' },
        { name: 'country', label: 'Country' },
        { name: 'stateProvince', label: 'State/Province' },
        { name: 'city', label: 'City' },
        { name: 'postalCode', label: 'Postal Code', type: 'number' },
      ].map(({ name, label, type = 'text', ...rest }) => {
        const isRequired = name !== 'postalCode' && name !== 'other';
        return (
          <div key={name}>
            <h1 className="pb-1">
              {label} {isRequired && <span className="text-red-600">*</span>}
            </h1>
            <input
              className={inputClass}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              {...(isRequired ? { required: true } : {})}
              {...rest}
            />
          </div>
        );
      })}

      <div className="pt-6">
        <div className="flex items-center space-x-4 pb-2">
          <div className="flex-grow border-t-2 border-green-500"></div>
          <h2 className="text-xl font-semibold text-gray-800">Program Details</h2>
          <div className="flex-grow border-t-2 border-green-500"></div>
        </div>
      </div>

      <div>
        <h1 className="pb-1">Academic Term<span className="text-red-600">*</span></h1>
        <select
          name="academicTerm"
          className="w-full p-2 border rounded"
          value={form.academicTerm}
          onChange={handleChange}
          required
        >
          <option value="">Select your term </option>
          {[
            "Fall", "Spring", "Summer"
          ].map((academicTerm) => (
            <option key={academicTerm} value={academicTerm}>{academicTerm}</option>
            
          ))}
        </select>
      </div>

      {[
        { name: 'academicYear', label: 'Academic Year', type: 'number' },
      ].map(({ name, label, type = 'text', ...rest }) => {
        const isRequired = name !== 'postalCode' && name !== 'other';
        return (
          <div key={name}>
            <h1 className="pb-1">
              {label} {isRequired && <span className="text-red-600">*</span>}
            </h1>
            <input
              className={inputClass}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              {...(isRequired ? { required: true } : {})}
              {...rest}
            />
          </div>
        );
      })}

      <div>
        <h1 className="pb-1">English Test Taken <span className="text-red-600">*</span></h1>
        <select
          name="englishTest"
          className="w-full p-2 border rounded"
          value={form.englishTest}
          onChange={handleChange}
          required
        >
          <option value="">Select your test </option>
          {[
            "TOEFL", "IELTS", "Duolingo", "Other"
          ].map((englishTest) => (
            <option key={englishTest} value={englishTest}>{englishTest}</option>
            
          ))}
        </select>
      </div>

      {[
        { name: 'other', label: 'If Other, please specify' },
        { name: 'testScore', label: 'English Test Score', type: 'number' },
        { name: 'gpa', label: 'Cumulative GPA', type: 'number' },
      ].map(({ name, label, type = 'text', ...rest }) => {
        const isRequired = name !== 'postalCode' && name !== 'other';
        return (
          <div key={name}>
            <h1 className="pb-1">
              {label} {isRequired && <span className="text-red-600">*</span>}
            </h1>
            <input
              className={inputClass}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              {...(isRequired ? { required: true } : {})}
              {...rest}
            />
          </div>
        );
      })}

      <div className="pt-6">
        <div className="flex items-center space-x-4 pb-2">
          <div className="flex-grow border-t-2 border-green-500"></div>
          <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
          <div className="flex-grow border-t-2 border-green-500"></div>
        </div>
      </div>

      {fileUploader("High School/College Transcript", transcriptFile, setTranscriptFile, transcriptInputRef)}
      {fileUploader("Passport Bio Page OR ID Card", idFile, setIdFile, idInputRef)}
      {fileUploader("English Proficiency Test Result", testResultFile, setTestResultFile, testResultInputRef)}
      
      <div className="pt-6">
        <div className="flex items-center space-x-4 pb-2">
          <div className="flex-grow border-t-2 border-green-500"></div>
          <h2 className="text-xl font-semibold text-gray-800">Submission</h2>
          <div className="flex-grow border-t-2 border-green-500"></div>
        </div>
      </div>

      {[
        { name: 'signed', label: 'I certify that the information provided is true. Type full name below' },
      ].map(({ name, label, type = 'text', ...rest }) => (
        <div key={name}>
          <h1 className="pb-1">{label} <span className="text-red-600">*</span></h1>
          <input
            className={inputClass}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            {...rest}
          />
        </div>
      ))}

      <button
        className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded transition mb-10"
        type="submit"
      >
        Submit Application
      </button>

    </form>
  );
}
