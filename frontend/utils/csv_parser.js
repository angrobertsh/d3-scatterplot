const data = require('../../assets/data/phl_hec_all_confirmed.csv');

export const parseCsv = () => Promise.resolve(data)

// data sample:
// An object of objects keyed by 0...length with contents like this:
// {
// P. Appar Size (deg): 36.81
// P. Atmosphere Class: "hydrogen-rich"
// P. Composition Class: "gas"
// P. Confirmed: 1
// P. Density (EU): 0.64
// P. Disc. Method: "Imaging"
// P. Disc. Year: 2008
// P. ESI: 0.05
// P. Eccentricity: 0
// P. Esc Vel (EU): 15.29
// P. Gravity (EU): 12.28
// P. HZA: 85.62
// P. HZC: 23.51
// P. HZD: 800.07
// P. HZI: 0
// P. Hab Moon: 0
// P. Habitable: 0
// P. Habitable Class: "non-habitable"
// P. Inclination (deg): null
// P. Int ESI: 0
// P. Mag: -10.06
// P. Mass (EU): 4451.16
// P. Mass Class: "Jovian"
// P. Max Mass (EU): null
// P. Mean Distance (AU): 330
// P. Min Mass (EU): null
// P. Name: "1RXS 1609 b"
// P. Name KOI: null
// P. Name Kepler: null
// P. Omega (deg): 0
// P. Period (days): null
// P. Radius (EU): 19.04
// P. SFlux Max (EU): 0.000004079751
// P. SFlux Mean (EU): 0.000004079751
// P. SFlux Min (EU): 0.00000407975
// P. SPH: null
// P. Sem Major Axis (AU): 330
// P. Surf ESI: 0
// P. Surf Press (EU): 2870.4
// P. Teq Max (K): 11.4
// P. Teq Mean (K): 11.4
// P. Teq Min (K): 11.4
// P. Ts Max (K): null
// P. Ts Mean (K): null
// P. Ts Min (K): null
// P. Zone Class: "Cold"
// S. Age (Gyrs): 0.011
// S. Appar Mag: null
// S. Constellation: "Sco"
// S. DEC (deg): -21.0828
// S. Distance (pc): 145
// S. Hab Zone Max (AU): 1.362
// S. Hab Zone Min (AU): 0.54
// S. HabCat: 0
// S. Luminosity (SU): 0.444285
// S. Mag from Planet: -13.2
// S. Mass (SU): 0.73
// S. Name: "1RXS 1609"
// S. Name HD: null
// S. Name HIP: null
// S. No. Planets: 1
// S. No. Planets HZ: 0
// S. RA (hrs): 16.1583
// S. Radius (SU): 1.35
// S. Size from Planet (deg): 0.0022
// S. Teff (K):4060
// S. Type: "K7V"
// S. [Fe/H]: null
// }
