page 50000 TEST
{

    PageType = Card;
    ApplicationArea = All;
    UsageCategory = None;
    InsertAllowed = false;
    DeleteAllowed = false;
    Caption = 'TEST', Comment = 'DEU="TEST"';
    RefreshOnActivate = true;

    layout
    {
        area(Content)
        {
            // The control add-in can be placed on the page using usercontrol keyword.
            usercontrol(TEST; TEST)
            {

                trigger ControlReady()
                var
                    Res: Text;
                    Req: Text;
                    Content: Text;
                begin
                    CurrPage.TEST.Init();
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