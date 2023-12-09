export const translatePlansToDropdownOptions = (plans: any[]) => {
    const options = plans.map((plan) => {
        return {
            label: plan.planName,
            value: plan._id
        };
    });

    options.push({ label: 'New plan', value: 'new' });

    return options.reverse();
};
