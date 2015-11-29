/******************************************
	Changes resource strings

	Coded by : S M Mahbub Murshed
	Date: November 18, 2006
******************************************/
function SetResourceStrings()
{
	for (var resid in resource)
	{
		var resbyid = document.getElementById(resid);
		if(resbyid.type=="button")
			resbyid.value = resource[resid];
		else
			resbyid.innerHTML = resource[resid];
	}
}

/******************************************
	Toggle resource

	Coded by : S M Mahbub Murshed
	Date: November 18, 2006
******************************************/
function ToggleLanguage(lang)
{
	var resbyid;
	if(lang==1)
	{
		resource = en_resource;
		resbyid = document.getElementById("english_res");
		resbyid.innerHTML = "English";
		resbyid = document.getElementById("bangla_res");
		resbyid.innerHTML = "<a href=\"javascript:ToggleLanguage(2);\">বাংলা</a>";
	}
	else if(lang==2)
	{
		resource = bn_resource;
		resbyid = document.getElementById("english_res");
		resbyid.innerHTML = "<a href=\"javascript:ToggleLanguage(1);\">English</a>";
		resbyid = document.getElementById("bangla_res");
		resbyid.innerHTML = "বাংলা";
	}

	SetResourceStrings();
}

/******************************************
	Changes keyboard layout status

	\param ev the event

	Coded by : S M Mahbub Murshed
	Date: August 30, 2006
******************************************/
function ChangeKeyboarLayoutStatus()
{
	// var keyboard_ley = document.getElementById("keyboard");
	var field = document.getElementsByName('KeyboardLayoutOption');

	if(KeyBoardLayout==1 || EnglishKeyboard==true)
		{ // keyboard_ley.innerHTML = "বর্তমান লেখন পদ্ধতি: <b>ইংরেজী</b>";
		field[0].checked = true; }
	else if(KeyBoardLayout==2)
		{ // keyboard_ley.innerHTML = "বর্তমান লেখন পদ্ধতি: <b>বিজয় বাংলা</b>";
		field[KeyBoardLayout-1].checked = true; }
	else if(KeyBoardLayout==3)
		{ // keyboard_ley.innerHTML = "বর্তমান লেখন পদ্ধতি: <b>সামহোয়্যার-ইন ফোনেটিক বাংলা</b>";
		field[KeyBoardLayout-1].checked = true; }
	else if(KeyBoardLayout==4)
		{ // keyboard_ley.innerHTML = "বর্তমান লেখন পদ্ধতি: <b>অভ্র ফোনেটিক বাংলা</b>";
		field[KeyBoardLayout-1].checked = true; }
	else if(KeyBoardLayout==5)
		{ // keyboard_ley.innerHTML = "বর্তমান লেখন পদ্ধতি: <b>ইউনিজয় বাংলা</b>";
		field[KeyBoardLayout-1].checked = true; }
}

/******************************************
	Handles keyboard option button click

	\param event the event

	Coded by : S M Mahbub Murshed
	Date: August 30, 2006
******************************************/
function KeyboardLayoutOptionClick(event)
{
	var field = document.getElementsByName('KeyboardLayoutOption');
	
	for (var counter = 0; counter < field.length; counter++)
	{
		if (field[counter].checked)
		{
			KeyBoardLayout = counter+1; 
			ChangeKeyboarLayoutStatus();
			var myFld = document.getElementById(ID);
			myFld.focus();
			break;
		}
	}
} // end function KeyboardLayoutOptionClick

/******************************************
	Clears text area

	\param id the id of the html element

	Coded by : S M Mahbub Murshed
	Date: September 05, 2006
******************************************/
function ClearTextArea(idtxt)
{
	var elem = document.getElementById(idtxt);
	elem.value = "";
	elem.focus();
} // end function ClearTextArea

/******************************************
	On page load

	Coded by : S M Mahbub Murshed
	Date: September 12, 2006
******************************************/
function OnPageLoad()
{
	
	SetResourceStrings();
	ChangeKeyboarLayoutStatus();
	

	var myFld = document.getElementById(ID);
	var unicodefontLabel = document.getElementById("unicodefont");

	if(IE)
	{
		unicodefontLabel.innerHTML = ""
		myFld.style.fontFamily = "SutonnyBanglaOMJ";
	}
	else
	{
		unicodefontLabel.innerHTML = ""
		myFld.style.fontFamily = "SolaimanLipi";

	}
	myFld.style.width = 250;
	
}


