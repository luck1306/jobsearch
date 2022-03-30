const btn = document.getElementById('btn');
const name2 = document.getElementById('name');
const major = document.getElementById('major');
const PN = document.getElementById('phoneNumber');
const comment = document.getElementById('comment');

btn.addEventListener('click', async () => {

    const response = await fetch("/post", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            name: `${name2.value}`,
            major: `${major.value}`,
            phonenumber: PN.value,
            comment: `${comment.value}`
        },
    }).then((res) => {
        console.log(response)
    })

    // response.json().then(data => {
    //     console.log(data);
    // });

    // const req = {
    //     name: name2.value,
    //     major: major.value,
    //     phonenumber: PN.value,
    //     comment: comment.value,
    // };

    // fetch('/post', {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    // }).then((res) => res.json())
    //     .then((res) => {
    //         if (res.success) {
    //             location.href = "/";
    //         }
    //         else {
    //             alert(res.msg);
    //         }
    //         console.log(res)
    //     }).catch((err) => console.log);
});