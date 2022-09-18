const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = form.company.value;
    const job_title = form.job_title.value;
    const experience = form.experience.value;
    const location = form.location.value;
    const arrangement = form.arrangement.value;
    const salary = form.salary.value;
    const gender = form.gender.value;
    const education = form.education.value;
    const contributions = form.contributions.value;

    const res = await fetch("/add", {
        method: "POST",
        body: JSON.stringify({ company,
            job_title,
            experience,
            location,
            arrangement,
            salary,
            gender,
            education,
            contributions
        }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();

    if (data.success) {
        window.location = "/thanks"
    }
    
})