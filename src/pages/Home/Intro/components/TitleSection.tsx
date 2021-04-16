import { Theme } from 'constants/theme';
import styled from 'styled-components';

const TitleSection = () => {
    return (
        <TitleArea>
            <Title>
                <Titlepre>Callisto</Titlepre>
                <Titleaft>Network</Titleaft>
            </Title>
        </TitleArea>
    )
}

const TitleArea = styled.div`
    width: 974px;
    background: linear-gradient(
        90deg
        ,rgb(3 9 6 / 37%) 0%,rgb(55 106 98 / 16%) 35%,rgb(24 99 47 / 8%) 100%);
    margin-top: 54px;
    padding: 10px 0px 10px 8%;
    @media (max-width: 974px) {
        background: linear-gradient(90.1deg, #000000 0.09%, #0C1C1B 99.91%);
        width: 100%;
        margin-top:  60px;
    }
    @media (max-width: 768px) {
        padding: 10px 0px 10px 20px;
    }
    @media (max-width: 596px) {
        margin-top: 120px;
    }
    @media (max-width: 375px) {
        margin-top: 50px;
    }
`;

const Title = styled.div`
    display: flex;
    @media (max-width: 596px) {
        display: block;
    }
`;
const Titlepre = styled.h1`
    font-weight: 700;
    font-size: 96px;
    line-height: 120px;
    color: white;
    font-family: ${Theme.fonts.body};
    padding-right: 20px;
    @media (max-width: 768px) {
        font-size: 80px;
        line-height: 80px;
    }
    @media (max-width: 375px) {
        font-size: 60px;
        line-height: 60px;
    }
`;

const Titleaft = styled.span`
    color: green;
    font-weight: 700;
    font-size: 96px;
    line-height: 120px;
    font-family: sunflower;
    @media (max-width: 768px) {
        font-size: 80px;
        line-height: 80px;
    }
    @media (max-width: 375px) {
        font-size: 60px;
        line-height: 60px;
    }
`;

export default TitleSection;
