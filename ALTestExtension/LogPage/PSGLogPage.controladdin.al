// The controladdin type declares the new add-in.
controladdin PSGLogPage
{
    // The Scripts property can reference both external and local scripts.
    Scripts = 'http://127.0.0.1:5500/src/script/bcui.js', 'ALTestExtension/LogPage/main.js';
    // The StartupScript is a special script that the web client calls once the page is loaded.

    StartupScript = 'ALTestExtension/LogPage/startup.js';

    // Specifies the StyleSheets that are included in the control add-in.
    StyleSheets = 'http://127.0.0.1:5500/dist/bcui.css', 'ALTestExtension/LogPage/main.css';

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