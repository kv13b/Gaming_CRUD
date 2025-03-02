import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lnatzipwjailofzswqkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYXR6aXB3amFpbG9menN3cWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNDg4MzYsImV4cCI6MjA1NDgyNDgzNn0.PZkkiBQz9fjBLE5aKj_kP6LY80GZS1D8rieHsCCk3r4')



$(document).ready(function () {
    document.getElementById("divSignUp").style.display = "none";
    document.getElementById("divForgetPass").style.display = "none";
    $("#txtStudent_ID").focus();
    $('input:password').bind("keydown", function (e) {
        if (e.which == 13)//Enter key
        {
            e.preventDefault(); //to skip default behavior of the enter key
//            var TextboxId = $('input:text').index(this);
            var TextboxId = $(this).attr('id');

            if (TextboxId === "txtSignInPassword")//Purchase Date
            {
                SignIn();
            }
        }
    });
});
function ShowSignUp()
{
    document.getElementById("divSignIn").style.display = "none";
    document.getElementById("divSignUp").style.display = "block";
}

function ShowSignIn()
{
    document.getElementById("divSignIn").style.display = "block";
    document.getElementById("divSignUp").style.display = "none";
}

function ShowForgotPassword()
{
    document.getElementById("divSignIn").style.display = "none";
    document.getElementById("divSignUp").style.display = "none";
    document.getElementById("divForgetPass").style.display = "block";
}


function SignIn() {
    if ($("#txtStudent_ID").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Registration No.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "Ok") {
                }

            }
        });
    }
    else if ($("#txtSignInPassword").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Password",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {
                if (result === "Ok") {
                }
            }
        });
    }
     else if ($("#txtSignInPassword").val().length < 8)
    {
        msgBoxImagePath = "../../Styles/image/";
        $.msgBox({
            title: "Alert",
            content: "Password should contain atleast 8 characters.",
            type: "alert",
            buttons: [{value: "OK"}],
            success: function (result) {
                if (result === "OK") {
                    return false;
                }
            }
        });
    }
    else
    {
        var c = {Student_ID: $("#txtStudent_ID").val(), password: $("#txtSignInPassword").val()};
        var data = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/E_coreweb/webresources/UserMaster/StudentLoginValidate",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function successshow(response) {
                var c = eval(response);
                if (c[0].Valid === true) {
                    window.sessionStorage.setItem('Student_Name', c[0].Student_Name);
                    window.sessionStorage.setItem('Student_ID', c[0].Student_ID);
                    window.sessionStorage.setItem('Client_ID', c[0].Client_ID);
                    window.sessionStorage.setItem('Outlet_ID', c[0].Outlet_ID);
                    $("#txtStudent_ID").val('');
                    $("#txtSignInPassword").val('');
                    window.location.href = "/E_coreweb/StudentPanel.html";
                }
                else
                {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Login",
                        content: c[0].Message,
                        type: "Alert",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                                $("#txtSignInPassword").val('');
                                $("#txtSignInPassword").focus();
                            }
                        }
                    });
                }


            },
            error: function (request, status, error) {
                alert(request.statusText);
            }
        });
    }
}

function GetCode() {

    if ($("#txtStudent_IDReg").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Registration No.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "Ok") {
                }

            }
        });
    }
    else
    {
        var c = {Student_ID: $("#txtStudent_IDReg").val()};
        var data = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/E_coreweb/webresources/UserMaster/GetCode",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function successshow(response) {
                var c = eval(response);
                if (c[0].Valid === true) {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration",
                        content: "Verification code has been sent to your registered mail id.",
                        type: "success",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }
                else
                {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Login",
                        content: c[0].Message,
                        type: "Alert",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }


            },
            error: function (request, status, error) {
                alert(request.statusText);
            }
        });
    }
}

function Register() {

    if ($("#txtStudent_IDReg").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Registration No.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtCode").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Verification code",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtSignUpPassword").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter New Password.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtSignUpPassword").val().length < 8)
    {
        msgBoxImagePath = "../../Styles/image/";
        $.msgBox({
            title: "Alert",
            content: "Password should contain atleast 8 characters.",
            type: "alert",
            buttons: [{value: "OK"}],
            success: function (result) {
                if (result === "OK") {
                    return false;
                }
            }
        });
    }
    else
    {
        var c = {Student_ID: $("#txtStudent_IDReg").val(), OTP: $("#txtCode").val(), password: $("#txtSignUpPassword").val()};
        var data = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/E_coreweb/webresources/UserMaster/Register",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function successshow(response) {
                var c = eval(response);
                if (c[0].Valid === true) {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration Successfull",
                        content: "Please Login",
                        type: "success",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                                window.location.href = "/E_coreweb/SignUp.html";
                            }
                        }
                    });

                }
                else
                {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration Failed",
                        content: c[0].Message,
                        type: "Alert",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }


            },
            error: function (request, status, error) {
                alert(request.statusText);
            }
        });
    }
}

function GetCode_ForgotPassword() {

    if ($("#txtStudent_IDForgot").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Registration No.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "Ok") {
                }

            }
        });
    }
    else
    {
        var c = {Student_ID: $("#txtStudent_IDForgot").val()};
        var data = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/E_coreweb/webresources/UserMaster/GetCode_ForgotPassword",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function successshow(response) {
                var c = eval(response);
                if (c[0].Valid === true) {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration",
                        content: "Verification code ahave been sent to your registered mail id.",
                        type: "success",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }
                else
                {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Login",
                        content: c[0].Message,
                        type: "Alert",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }


            },
            error: function (request, status, error) {
                alert(request.statusText);
            }
        });
    }
}

function Register_ForgotPassword() {

    if ($("#txtStudent_IDForgot").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Registration No.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtCodeForgot").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter Verification code",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtSignUpPasswordForgot").val() === "")
    {
        msgBoxImagePath = "../Styles/image/";
        $.msgBox({
            title: "Login",
            content: "Please Enter New Password.",
            type: "Alert",
            buttons: [{value: "Ok"}],
            success: function (result) {

                if (result === "OK") {
                    return false;
                }

            }
        });
    }
    else if ($("#txtSignUpPasswordForgot").val().length < 8)
    {
        msgBoxImagePath = "../../Styles/image/";
        $.msgBox({
            title: "Alert",
            content: "Password should contain atleast 8 characters.",
            type: "alert",
            buttons: [{value: "OK"}],
            success: function (result) {
                if (result === "OK") {
                    return false;
                }
            }
        });
    }
    else
    {
        var c = {Student_ID: $("#txtStudent_IDForgot").val(), OTP: $("#txtCodeForgot").val(), password: $("#txtSignUpPasswordForgot").val()};
        var data = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/E_coreweb/webresources/UserMaster/Register",
            data: data,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function successshow(response) {
                var c = eval(response);
                if (c[0].Valid === true) {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration Successfull",
                        content: "Please Login",
                        type: "success",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                                window.location.href = "/E_coreweb/SignUp.html";
                            }
                        }
                    });

                }
                else
                {
                    msgBoxImagePath = "../Styles/image/";
                    $.msgBox({
                        title: "Registration Failed",
                        content: c[0].Message,
                        type: "Alert",
                        buttons: [{value: "Ok"}],
                        success: function (result) {
                            if (result === "Ok") {
                            }
                        }
                    });
                }


            },
            error: function (request, status, error) {
                alert(request.statusText);
            }
        });
    }
}

$(function() {
    $("input.only-positive-decimal").bind("change keyup input", function() {
        var position = this.selectionStart - 1;
        //remove all but number and .
        var fixed = this.value.replace(/[^0-9\.]/g, '');
        if (fixed.charAt(0) === '.')                  //can't start with .
            fixed = fixed.slice(1);

        var pos = fixed.indexOf(".") + 1;
        if (pos >= 0)               //avoid more than one .
            fixed = fixed.substr(0, pos) + fixed.slice(pos).replace('.', '');

        if (this.value !== fixed) {
            this.value = fixed;
            this.selectionStart = position;
            this.selectionEnd = position;
        }
    });
});