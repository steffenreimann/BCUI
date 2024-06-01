// The controladdin type declares the new add-in.
controladdin PSGLogPage
{
    // The Scripts property can reference both external and local scripts.
    Scripts = 'https://github.com/steffenreimann/BCUI/releases/download/0.1/bcui.js', 'ALTestExtension/LogPage/main.js';
    // The StartupScript is a special script that the web client calls once the page is loaded.

    StartupScript = 'ALTestExtension/LogPage/startup.js';

    // Specifies the StyleSheets that are included in the control add-in.
    StyleSheets = 'https://github.com/steffenreimann/BCUI/releases/download/0.1/bcui.css', 'ALTestExtension/LogPage/main.css';

    HorizontalStretch = true;
    HorizontalShrink = true;
    MinimumWidth = 250;

    VerticalShrink = true;
    VerticalStretch = true;
    MinimumHeight = 250;

    // RequestedHeight = 500;

    event ControlReady();

    procedure Init()
}

//ssh -L 5500:waytooeasy.dev:5500  steffen@waytooeasy.dev