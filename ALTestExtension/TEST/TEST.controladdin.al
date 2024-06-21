// The controladdin type declares the new add-in.
controladdin TEST
{
    // The Scripts property can reference both external and local scripts.
    Scripts = 'https://github.com/steffenreimann/BCUI/releases/download/0.1/bcui.js', 'ALTestExtension/TEST/main.js';
    // The StartupScript is a special script that the web client calls once the page is loaded.

    StartupScript = 'ALTestExtension/TEST/startup.js';

    // Specifies the StyleSheets that are included in the control add-in.
    StyleSheets = 'https://github.com/steffenreimann/BCUI/releases/download/0.1/bcui.css', 'ALTestExtension/TEST/main.css';

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