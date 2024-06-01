page 50000 PSGLog
{

    PageType = Card;
    ApplicationArea = All;
    UsageCategory = None;
    //SourceTable = PSGLogs;
    InsertAllowed = false;
    DeleteAllowed = false;
    Caption = 'API Logs', Comment = 'DEU="API Logs"';
    RefreshOnActivate = true;

    layout
    {
        area(Content)
        {
            // The control add-in can be placed on the page using usercontrol keyword.
            usercontrol(PSGLogPage; PSGLogPage)
            {

                trigger ControlReady()
                var
                    Res: Text;
                    Req: Text;
                    Content: Text;
                begin
                    CurrPage.PSGLogPage.Init();
                end;
            }
        }
    }

    actions
    {
        area(Creation)
        {

        }
    }
}