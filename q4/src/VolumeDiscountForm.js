import React, { useState } from "react";
import { Page, Layout, LegacyCard, FormLayout, TextField, Card, BlockStack, InlineGrid, Text, Button, Divider, Select, DataTable } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import { useForm, Controller } from "react-hook-form";

const discountTypes = [
    { label: "None", value: "none" },
    { label: "% Discount", value: "percentage" },
    { label: "Discount / Each", value: "amount" },
];

export default function VolumeDiscountForm() {
    const {
        control,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm();

    const [options, setOptions] = useState([
        { id: 1, title: "", label: "", subtitle: "", quantity: 1, discountType: "none", amount: "" },
        { id: 2, title: "", label: "", subtitle: "", quantity: 1, discountType: "none", amount: "" },
    ]);

    const addOption = () => {
        setOptions((prev) => [
            ...prev,
            { id: prev[prev.length - 1].id + 1, title: "", quantity: 1, discountType: "none", amount: "" },
        ]);
    };

    const removeOption = (id) => {
        setOptions((prev) => prev.filter((opt) => opt.id !== id));
    };

    const handleInputChange = (index, field, value) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    const onSubmit = (data) => {
        let er="";
        if(!data.campaignName || data.campaignName.trim() === "")
            er+="Campaign is required!\n"
        options.forEach(element => {
            if(element.title==="")
                er+="Title of option "+element.id+" is not null\n";
            if(element.amount==="")
                er+="Amount of option "+element.id+" is greater than 0\n";
            if(element.quantity==="")
                er+="Quantity of option "+element.id+" is greater than 0\n";
        });
        if(er!==""){
            alert(er);
            return;
        }
        console.log("Form Submitted:", { ...data, options });
        alert("Form submitted successfully!");
    };
    return (
        <Page
            backAction={{ content: 'Settings', url: '#' }}
            title="Create Volume Discount"
        >
            <Layout>
                <Layout.Section>
                    <LegacyCard title="General" sectioned>
                        <FormLayout>
                            <Controller
                                name="campaignName"
                                control={control}
                                rules={{ required: "Campaign name is required" }}
                                render={({ field }) => (
                                    <TextField label="Campaign" {...field} error={errors.campaignName?.message} />
                                )}
                            />
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => <TextField label="Title" {...field} />}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => <TextField label="Description" {...field} multiline />}
                            />
                        </FormLayout>
                    </LegacyCard>
                    <LegacyCard title="Volume Discount Rule" sectioned>
                        <Divider />
                        {options.map((option, index) => (
                            <Card roundedAbove="sm" key={option.id}>
                                <BlockStack gap="200">
                                    <InlineGrid columns="1fr auto">
                                        <div className="options">
                                            <Text as="h2" variant="headingSm">
                                                Option {option.id}
                                            </Text>
                                        </div>
                                        <Button
                                            onClick={() => removeOption(option.id)}
                                            accessibilityLabel="Delete"
                                            icon={DeleteIcon}
                                        >
                                        </Button>
                                    </InlineGrid>
                                    <FormLayout>
                                        <FormLayout.Group condensed>
                                            <TextField
                                                label="Title"
                                                value={option.title}
                                                onChange={(value) => handleInputChange(index, "title", value)}
                                            />
                                            <TextField
                                                label="SubTitle"
                                                value={option.subtitle}
                                                onChange={(value) => handleInputChange(index, "subtitle", value)}
                                            />
                                            <TextField
                                                label="Label(optional)"
                                                value={option.label}
                                                onChange={(value) => handleInputChange(index, "label", value)}
                                            />
                                        </FormLayout.Group>
                                        <FormLayout.Group condensed>
                                            <TextField
                                                label="Quantity"
                                                type="number"
                                                value={option.quantity}
                                                onChange={(value) => handleInputChange(index, "quantity", value)}
                                            />
                                            <Select
                                                label="Discount Type"
                                                options={discountTypes}
                                                value={option.discountType}
                                                onChange={(value) => handleInputChange(index, "discountType", value)}
                                            />
                                            {option.discountType !== "none" && (
                                                <TextField
                                                    label="Amount"
                                                    type="number"
                                                    value={option.amount}
                                                    suffix={option.discountType === "percentage" ? "%" : "$"}
                                                    onChange={(value) => handleInputChange(index, "amount", value)}
                                                />
                                            )}
                                        </FormLayout.Group>
                                    </FormLayout>
                                    <Divider />
                                </BlockStack>
                            </Card>
                        ))}
                        <Button fullWidth icon={PlusIcon} onClick={addOption} variant="primary" tone="critical">Add Option</Button>
                    </LegacyCard>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                    <LegacyCard title="Preview" sectioned>
                        <strong style={{ textAlign: "center",display:"block" }}>{watch("title")}</strong>
                        <p>{watch("description")}</p>
                        <DataTable
                            columnContentTypes={["text", "text", "numeric", "numeric"]}
                            headings={["Title", "Discount Type", "Quantity", "Amount"]}
                            rows={options.map((opt) => [opt.title, discountTypes.find((type) => type.value === opt.discountType)?.label || "None", opt.quantity, opt.amount ? (opt.discountType === "percentage" ? `${opt.amount}%` : `$${opt.amount}`) : "N/A"])}
                        />
                        <Button fullWidth onClick={handleSubmit(onSubmit)} primary>Save</Button>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
