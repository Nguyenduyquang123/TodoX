const Footer = ({completedTasksCount =2 , activeTasksCount = 4}) => {
    return <>
        {completedTasksCount + activeTasksCount > 0 && (
            <div className="text-sm text-muted-foreground text-center">
                {
                    completedTasksCount > 0 && (
                        <>
                            Bạn đã hoàn thành {completedTasksCount} nhiệm vụ.
                            {activeTasksCount > 0 && (
                                <span> Còn lại {activeTasksCount} nhiệm vụ nữa thôi.</span>
                            )}
                        </>
                    )
                }
                {
                    completedTasksCount === 0 && activeTasksCount > 0 && (
                        <>
                            Bạn có {activeTasksCount} nhiệm vụ đang làm.
                        </>
                    )
                }
            </div>
        )}
    </>
}

export default Footer;
