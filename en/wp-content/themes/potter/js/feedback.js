
grecaptcha.ready(function() {
    grecaptcha.execute('6LfPy2oaAAAAAFPbFbLZq_5skboVGKA3Tnmkc-o1', {action: 'homepage'}).then(function(token) {
        document.getElementById('g-recaptcha-response').value=token;
    });
});

setInterval(function(){
    grecaptcha.ready(function() {
        grecaptcha.execute('6LfPy2oaAAAAAFPbFbLZq_5skboVGKA3Tnmkc-o1', {action: 'homepage'}).then(function(token) {
            document.getElementById('g-recaptcha-response').value=token;
        });
    });

}, 100000);



jQuery(document).ready(function ($) {

$('#submit-feedback').click(function() {

    var add_form = $('#add_feedback');

    var lang = $('#submit-feedback').attr('data-lang');
    var send = 'Отправить сообщение';
    var sending = 'Отправляем...';
    var wrong = 'Что-то пошло не так...';
    if (lang == 'en') {
        send = 'Send a message';
        sending = 'Sending...';
        wrong = 'Something went wrong...';
    }

    // Сброс значений полей
    $('#add_feedback input, #add_feedback textarea').on('blur', function () {
        $('#add_feedback input, #add_feedback textarea').removeClass('error');
        $('.error-name,.error-email,.error-comments,.message-success').remove();
        $('#submit-feedback').val(send);
    });

    // Отправка значений полей
    var options = {
        url: feedback_object.url,
        data: {
            action: 'feedback_action',
            nonce: feedback_object.nonce
        },
        type: 'POST',
        dataType: 'json',
        beforeSubmit: function (xhr) {
            // При отправке меняем надпись на кнопке
            $('#submit-feedback').val(sending);
        },
        success: function (request, xhr, status, error) {

            if (request.success === true) {
                // Если все поля заполнены, отправляем данные и меняем надпись на кнопке
                add_form.after('<div class="message-success">' + request.data + '</div>').slideDown();
                $('#submit-feedback').val(send);
            } else {
                // Если поля не заполнены, выводим сообщения и меняем надпись на кнопке
                $.each(request.data, function (key, val) {
                    $('.art_' + key).addClass('error');
                    $('.art_' + key).before('<span class="error-' + key + '">' + val + '</span>');
                });
                $('#submit-feedback').val(wrong);

            }
            // При успешной отправке сбрасываем значения полей
            $('#add_feedback')[0].reset();
        },
        error: function (request, status, error) {
            $('#submit-feedback').val(wrong);
        }
    };
    // Отправка



    add_form.ajaxForm(options);

    grecaptcha.ready(function() {
        grecaptcha.execute('6LfPy2oaAAAAAFPbFbLZq_5skboVGKA3Tnmkc-o1', {action: 'homepage'}).then(function(token) {
            document.getElementById('g-recaptcha-response').value=token;
        });
    });

    //grecaptcha.reset();
});

});