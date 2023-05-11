const resizer =
    'W3siX2lkIjoiNjQ1ZDE0ZjA2MmUyNjE4YzYxMzc5ODdjIiwibmFtZSI6IkdvYXQgSm9pIiwicGhvdG9VUkwiOiJodHRwczovL2NzMTIucGlrYWJ1LnJ1L3Bvc3RfaW1nL2JpZy8yMDIxLzAzLzAyLzEwLzE2MTQ3MDIzMjQxMTg1ODA0ODEucG5nIiwiYmlydGhkYXkiOiIyMDIwLTA3LTEzVDAwOjAwOjAwLjAwMFoiLCJicmVlZCI6IkdvYXQiLCJjb21tZW50cyI6IkkgbG92ZSBpdCB3aGVuIFRlYW1sZWFkIG1pbGtzIG1lIiwib3duZXIiOiI2NDVkMDYzNjQ3NWJhMTBkZWZiNzVjYjUiLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTExVDE2OjE2OjQ4LjI0N1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTExVDE2OjE2OjQ4LjI0N1oifSx7Il9pZCI6IjY0NWQzMTM5NzZmMTRhZTE4ZDFhODgxMyIsIm5hbWUiOiJHb2F0IFBvcHBlciIsInBob3RvVVJMIjoiaHR0cHM6Ly93ZWJwdWxzZS5pbWdzbWFpbC5ydS9pbWdwcmV2aWV3P2tleT1wdWxzZV9jYWJpbmV0LWltYWdlLTI1NmEzYmM1LTMzYjUtNDNkOS1iMTc0LTU0M2U2M2YxMTJlZSZtYj13ZWJwdWxzZSIsImJpcnRoZGF5IjoiMjAxOS0wOS0xMlQwMDowMDowMC4wMDBaIiwiYnJlZWQiOiJHb2F0IiwiY29tbWVudHMiOiJJIGxpa2Ugd2hlbiBteSBUZWFtbGVhZCBnZW50bHkgbWlsa3MgbWUgIiwib3duZXIiOiI2NDVkMDYzNjQ3NWJhMTBkZWZiNzVjYjUiLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjE3OjI5LjE1NFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjE3OjI5LjE1NFoifSx7Il9pZCI6IjY0NWQzMWU5NzZmMTRhZTE4ZDFhODgxNiIsIm5hbWUiOiJHb2F0IEtvdW1pc3MiLCJwaG90b1VSTCI6Imh0dHBzOi8vbW95YS1wbGFuZXRhLnJ1L3VwbG9hZC9pbWFnZXMveGwvYTgvNjMvYTg2MzFiZjlmOTUyNGIwZTAxODM2Y2M3MmY2M2ViZmM0ZWJhZjgyMS5qcGciLCJiaXJ0aGRheSI6IjIwMTgtMDMtMTJUMDA6MDA6MDAuMDAwWiIsImJyZWVkIjoiR29hdCIsImNvbW1lbnRzIjoiS291bWlzcyBmcm9tIGdvYXQncyBtaWxrIGlzIGJlbmVmaWNpYWwhIEdpdmUgbWUgYSB3aGlybCEiLCJvd25lciI6IjY0NWQwNjM2NDc1YmExMGRlZmI3NWNiNSIsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MjA6MjUuNDY4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MjA6MjUuNDY4WiJ9LHsiX2lkIjoiNjQ1ZDMzNWU3NmYxNGFlMThkMWE4ODE5IiwibmFtZSI6IkZ1bmt5IEhvcm5zIiwicGhvdG9VUkwiOiJodHRwczovL2F0bWFncm8ucnUvd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDgvJUQwJUIyJUQxJThCJUQwJUIxJUQwJUJFJUQxJTgwLSVEMSU4NSVEMCVCRSVEMSU4MCVEMCVCRSVEMSU4OCVEMCVCNSVEMCVCOS0lRDAlQkElRDAlQkUlRDAlQjclRDElOEIuanBnIiwiYmlydGhkYXkiOiIyMDE5LTA3LTIxVDAwOjAwOjAwLjAwMFoiLCJicmVlZCI6IkJvZXIgR29hdCIsImNvbW1lbnRzIjoiSSBtYXkgaGF2ZSBhIGZ1bmt5IGxvb2ssIGJ1dCBteSBtaWxrIG1ha2VzIHRoZSBiZXN0IGtvdW1pc3MgaW4gdG93biEiLCJvd25lciI6IjY0NWQwNjM2NDc1YmExMGRlZmI3NWNiNSIsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MjY6MzguMTk4WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MjY6MzguMTk4WiJ9LHsiX2lkIjoiNjQ1ZDMzYjM3NmYxNGFlMThkMWE4ODFjIiwibmFtZSI6IkRpc2NvIEJpc2N1aXQiLCJwaG90b1VSTCI6Imh0dHBzOi8vd3d3Lm5ld3J6aGV2LnJ1L21lZGlhL2syL2l0ZW1zL2NhY2hlL2YyZjFkZWZmZTRlMDY4NDc2YWJmZGU3ODNmMTBkN2E1X1hMLmpwZyIsImJpcnRoZGF5IjoiMjAyMC0wNC0xNVQwMDowMDowMC4wMDBaIiwiYnJlZWQiOiJTYWFuZW4gR29hdCIsImNvbW1lbnRzIjoiSSBtYXkgbG9vayBsaWtlIGEgZGlzY28gYmFsbCwgYnV0IG15IG1pbGsgd2lsbCBoYXZlIHlvdSBkYW5jaW5nIHdpdGggam95IGFmdGVyIGp1c3Qgb25lIHNpcCBvZiBteSBrb3VtaXNzISIsIm93bmVyIjoiNjQ1ZDA2MzY0NzViYTEwZGVmYjc1Y2I1IiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xMVQxODoyODowMy44MDdaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0xMVQxODoyODowMy44MDdaIn0seyJfaWQiOiI2NDVkMzNlZTc2ZjE0YWUxOGQxYTg4MWYiLCJuYW1lIjoiQ3JhenkgRXllcyIsInBob3RvVVJMIjoiaHR0cHM6Ly9pLnN0ZW5hLmVlLzIwLzIwMjEtMDktMTFfMDQzMzUzLmpwZyIsImJpcnRoZGF5IjoiMjAxNy0wOS0xMFQwMDowMDowMC4wMDBaIiwiYnJlZWQiOiJBbHBpbmUgR29hdCIsImNvbW1lbnRzIjoiRG9uJ3QgbGV0IG15IGNyYXp5IGV5ZXMgc2NhcmUgeW91ISBNeSBrb3VtaXNzIGlzIHRoZSBwZXJmZWN0IHJlbWVkeSBmb3IgYW55IGJhZCBkYXkhIiwib3duZXIiOiI2NDVkMDYzNjQ3NWJhMTBkZWZiNzVjYjUiLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjI5OjAyLjkxOFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjI5OjAyLjkxOFoifSx7Il9pZCI6IjY0NWQzNDRjNzZmMTRhZTE4ZDFhODgyMiIsIm5hbWUiOiJTaXIgTG9pbiIsInBob3RvVVJMIjoiaHR0cHM6Ly9rdXN0cm96LnJ1L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIxLzA0L21pb3RvbmlrMS5qcGciLCJiaXJ0aGRheSI6IjIwMTgtMTEtMDJUMDA6MDA6MDAuMDAwWiIsImJyZWVkIjoiTnViaWFuIEdvYXQiLCJjb21tZW50cyI6IkkgbWF5IGJlIG5hbWVkIFNpciBMb2luLCBidXQgbXkgbWlsayBpcyB0aGUgc3RhciBvZiB0aGUgc2hvdyB3aGVuIGl0IGNvbWVzIHRvIG1ha2luZyBrb3VtaXNzISIsIm93bmVyIjoiNjQ1ZDA2MzY0NzViYTEwZGVmYjc1Y2I1IiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xMVQxODozMDozNi45NzZaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0xMVQxODozMDozNi45NzZaIn0seyJfaWQiOiI2NDVkMzQ2OTc2ZjE0YWUxOGQxYTg4MjUiLCJuYW1lIjoiU2lyIExvaW4iLCJwaG90b1VSTCI6Imh0dHBzOi8va3VzdHJvei5ydS93cC1jb250ZW50L3VwbG9hZHMvMjAyMS8wNC9taW90b25pazEuanBnIiwiYmlydGhkYXkiOiIyMDE4LTExLTAyVDAwOjAwOjAwLjAwMFoiLCJicmVlZCI6Ik51YmlhbiBHb2F0IiwiY29tbWVudHMiOiJJIG1heSBiZSBuYW1lZCBTaXIgTG9pbiwgYnV0IG15IG1pbGsgaXMgdGhlIHN0YXIgb2YgdGhlIHNob3cgd2hlbiBpdCBjb21lcyB0byBtYWtpbmcga291bWlzcyEiLCJvd25lciI6IjY0NWQwNjM2NDc1YmExMGRlZmI3NWNiNSIsImNyZWF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MzE6MDUuNjg3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDUtMTFUMTg6MzE6MDUuNjg3WiJ9LHsiX2lkIjoiNjQ1ZDM0OTM3NmYxNGFlMThkMWE4ODI4IiwibmFtZSI6Ik11dHRvbiBDaG9wcyIsInBob3RvVVJMIjoiaHR0cHM6Ly9jZG4uZmlzaGtpLm5ldC91cGxvYWQvcG9zdC8yMDIwLzAzLzEzLzMyNTU4NTAvdG4vZmo2anJkaWs4aXFkdXV4cGptYzdrdzhudzR3bG5yd2gtYXNqNWJvZWpwY2RveHlhdmV0Ym5wcGJxa3htbWUyaW1hbXJwZXhxYndleGp0dHpnajlnc2dtZ2JpbWFydXBtY2JnZXRtMW54dzZxZmNleG0tZ28teW9rdWcxcTF6cC5qcGciLCJiaXJ0aGRheSI6IjIwMTktMDItMjhUMDA6MDA6MDAuMDAwWiIsImJyZWVkIjoiUHlnbXkgR29hdCIsImNvbW1lbnRzIjoiTXkgbWlsayBtYXkgY29tZSBmcm9tIGEgc21hbGwgZ29hdCwgYnV0IGl0IHBhY2tzIGEgYmlnIHB1bmNoIHdoZW4gaXQgY29tZXMgdG8gbWFraW5nIHRoZSBiZXN0IGtvdW1pc3MgYXJvdW5kISIsIm93bmVyIjoiNjQ1ZDA2MzY0NzViYTEwZGVmYjc1Y2I1IiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0xMVQxODozMTo0Ny45MzRaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0xMVQxODozMTo0Ny45MzRaIn0seyJfaWQiOiI2NDVkMzRiNDc2ZjE0YWUxOGQxYTg4MmIiLCJuYW1lIjoiTXV0dG9uIENob3BzIiwicGhvdG9VUkwiOiJodHRwczovL2Nkbi5maXNoa2kubmV0L3VwbG9hZC9wb3N0LzIwMjAvMDMvMTMvMzI1NTg1MC90bi9majZqcmRpazhpcWR1dXhwam1jN2t3OG53NHdsbnJ3aC1hc2o1Ym9lanBjZG94eWF2ZXRibnBwYnFreG1tZTJpbWFtcnBleHFid2V4anR0emdqOWdzZ21nYmltYXJ1cG1jYmdldG0xbnh3NnFmY2V4bS1nby15b2t1ZzFxMXpwLmpwZyIsImJpcnRoZGF5IjoiMjAxOS0wMi0yOFQwMDowMDowMC4wMDBaIiwiYnJlZWQiOiJQeWdteSBHb2F0IiwiY29tbWVudHMiOiJNeSBtaWxrIG1heSBjb21lIGZyb20gYSBzbWFsbCBnb2F0LCBidXQgaXQgcGFja3MgYSBiaWcgcHVuY2ggd2hlbiBpdCBjb21lcyB0byBtYWtpbmcgdGhlIGJlc3Qga291bWlzcyBhcm91bmQhIiwib3duZXIiOiI2NDVkMDYzNjQ3NWJhMTBkZWZiNzVjYjUiLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjMyOjIwLjQ3OFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTExVDE4OjMyOjIwLjQ3OFoifV0=';

module.exports = resizer;