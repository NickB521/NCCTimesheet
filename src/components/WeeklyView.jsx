import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn,
    Card, CardHeader, CardBody, CardFooter
} from "@nextui-org/react";

const WeeklyView = () => {

    return (
        <>
            <div className="weeklyWrapper">
                <Card className="headerCard">
                    <CardHeader>
                        <h2>Week View</h2>
                    </CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead">
                            <CardBody>
                                Button
                            </CardBody>
                            <Button className="tableCardButton" >Circle</Button>
                        </div>
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
            </div>

        </>
    );
}

export default WeeklyView;