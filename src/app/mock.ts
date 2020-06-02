const rawBugReport = [{
  id: 86350, state: "Resolved", areaPath: "CAPTOR", severity: "4 - Low", title: "Pagination - navigate to first and last page of search results <<>> (ONLY Remaining part is GO-TO)",
},
{
  id: 103944, state: "Resolved", areaPath: "CAPTOR\CAPTOR IMS", severity: "4 - Low", title: "IMS Search - Admin - Wrong Facilities are displaying in Facility field",
},
{
  id: 103945, state: "Resolved", areaPath: "CAPTOR\CAPTOR IMS", severity: "4 - Low", title: "IMS Search - Admin - Wrong facilities are showing in Location list",
},
{
  id: 116608, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "Date Picker - briefly displays 2 calendars (all angular apps)",
},
{
  id: 131447, state: "Active", areaPath: "CAPTOR\CAPTOR Grievance Tracking", severity: "4 - Low", title: "Staff Search/GTS Search - Pagination actions are n… Search Results Modal-double arrow is not working",
},
{
  id: 133246, state: "Active", areaPath: "CAPTOR\CAPTOR Grievance Tracking", severity: "3 - Medium", title: "DB Down-GTS Application not displaying error message when Data Base down",
},
{
  id: 133253, state: "Resolved", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "3 - Medium", title: "TinyMCE - adding a link does not retain that capability when viewing",
},
{
  id: 133619, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "Offender Basic Search - Back arrow: Browser; Right…k Back; Keyboard Alt-Left arrow should be enabled",
},
{
  id: 133624, state: "Resolved", areaPath: "CAPTOR", severity: "4 - Low", title: "Offender Basic Search - table view missing columns for ICOTS#, PBPP Location and DOC Location",
}, {
  id: 139767, state: "Active", areaPath: "CAPTOR\CAPTOR VANS", severity: "3 - Medium", title: "Add Address - Address goes from Domestic to International once done - Reported in Prod (05/14)",
}, {
  id: 145555, state: "Active", areaPath: "CAPTOR\CAPTOR Location Management", severity: "4 - Low", title: "LP-LCM-Contact Directory does not look the same as in LCMF09 (fields shifted) ",
}, {
  id: 145563, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "4 - Low", title: "LP-ERROR message during a deployment",
}, {
  id: 148221, state: "Active", areaPath: "CAPTOR", severity: "3 - Medium", title: "Offender Basic Search-2 diff key values for an offender/dups suppressed when searching by key value",
}, {
  id: 148544, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "3 - Medium", title: "Cache Server-should fall back to get data from data base if system errors",
}, {
  id: 149685, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "3 - Medium", title: "Individual Employee Search In Prod - On the Page L…ncy and Status Fields/DDL are not Being Displayed",
}, {
  id: 152362, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "3 - Medium", title: "Security-UAT-Modify Access-Taking TypeError: Object doesn't support property or method 'filter'",
}, {
  id: 152480, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "4 - Low", title: "White flash is seen when switching between offender specific screens",
}, {
  id: 153216, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "3 - Medium", title: "Security-Individual Employee Search-TypeError: Cannot read property",
}, {
  id: 155140, state: "Active", areaPath: "CAPTOR\CAPTOR Grievance Tracking", severity: "4 - Low", title: "Print Forms - Blank page printing when there is a spaces after text",
}, {
  id: 156177, state: "Active", areaPath: "CAPTOR", severity: "3 - Medium", title: "Offender Profile - PBPP Only offender/no longer in supervisor control, CAPTOR data disappears",
}, {
  id: 158738, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "Notifications -Refresh notifcations while staying within app",
}, {
  id: 159600, state: "Active", areaPath: "CAPTOR", severity: "2 - High", title: "Server error-logginapi is causing app04 to be slow and produce server errors",
}, {
  id: 159810, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "Notifications- User cannot view the full details o…ations exists (Scroll does not moves the tile up)",
}, {
  id: 159874, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise\CAPTOR Data Sync", severity: "3 - Medium", title: "Data Sync - ICOTS# is Not Appearing in CAPTOR",
}, {
  id: 159964, state: "Active", areaPath: "CAPTOR", severity: "3 - Medium", title: "Reentrant profile more photos",
}, {
  id: 160807, state: "Active", areaPath: "CAPTOR\CAPTOR Data Warehouse", severity: "4 - Low", title: "GTS Reports - User input values are not pre populating when No Data Found in both Excel and PDF",
}, {
  id: 160994, state: "Active", areaPath: "CAPTOR\CAPTOR VANS", severity: "4 - Low", title: "Edit Address -Edit 'ST' to 'STREET' and select val…thing but added 'modified by and on' information ",
}, {
  id: 161513, state: "Active", areaPath: "CAPTOR\CAPTOR Case Notes", severity: "4 - Low", title: "TR-MH Units not showing in reports",
}, {
  id: 162424, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "4 - Low", title: "IPAD issues - Left side panel - for few applicatio…e dispalying under logos and subfolders on screen",
}, {
  id: 163197, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise", severity: "4 - Low", title: "Reentrant Search - Search results should appear in alphabetical order",
}, {
  id: 163823, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "Employee Tiles-PPB logo/agency name has changed and needs updated on tiles",
}, {
  id: 163997, state: "Active", areaPath: "CAPTOR\CAPTOR Data Warehouse", severity: "3 - Medium", title: "GTS Reports - Pending Initial Response - Taking too much time (an hour) to get the report",
}, {
  id: 164216, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "4 - Low", title: "Employee Search-Agency Name Acronym needs to be Updated to PPB",
}, {
  id: 164224, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "4 - Low", title: "Security-Group Tasks-Back to Tasks Button When Com…is Not Returning the User to Where they Came From",
}, {
  id: 164664, state: "Active", areaPath: "CAPTOR\CAPTOR IMS", severity: "4 - Low", title: "IMS Notes - Scroll bar not displaying consistantly for comments area",
}, {
  id: 164792, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "4 - Low", title: "Security-Manually Added Accesses When End Dated Ap…s to the User VIA the CAPTOR Menu as Still Active",
}, {
  id: 164794, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "4 - Low", title: "Security-PROD-Employee Security Access Detials-Typ… Object doesn't support property or method filter",
}, {
  id: 165126, state: "Resolved", areaPath: "CAPTOR\CAPTOR Grievance Tracking", severity: "2 - High", title: "Category - Sometimes Appeal to Facility button not displaying when category is Photograph",
}, {
  id: 165566, state: "Active", areaPath: "CAPTOR\Correspondence Management", severity: "3 - Medium", title: "Create Template-Text Pasted in tiny mcc Box Defaults to Black",
}, {
  id: 165584, state: "Active", areaPath: "CAPTOR\CAPTOR Enterprise Security User Process", severity: "4 - Low", title: "Security-Completed Tasks are Stuck on the Group Tasks",
}, {
  id: 165659, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "PVSN - Note list - Subject(s) does not show the dots on the tile when note has more subject(s)",
}, {
  id: 165664, state: "Active", areaPath: "CAPTOR", severity: "4 - Low", title: "PVSN - Note list - Tooltip appears when there is only one subject in the note",
}, {
  id: 165675, state: "Active", areaPath: "CAPTOR\CAPTOR Data Warehouse", severity: "2 - High", title: "Activity by Inmate - Report failed due to duplicate sub-office codes in the database",
}, {
  id: 166502, state: "Active", areaPath: "CAPTOR\Correspondence Management", severity: "4 - Low", title: "Create Template-Tinymce  Headers are Hard to See in Day Mode",
}, {
  id: 166712, state: "Resolved", areaPath: "CAPTOR\CAPTOR Grievance Tracking", severity: "4 - Low", title: "Print Forms - Bullet points are not displaying in … user added bullet points to the Response summary",
}, {
  id: 167588, state: "Active", areaPath: "CAPTOR", severity: "2 - High", title: "PROD - workitem exceptions - slowness in all Applications (monitor)",
}];

export {
  rawBugReport
};