import React from "react";
import GoodsTable from "./GoodsTable";
import { AppBar, Button, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import GoodService from '../services/GoodService';

class AdminPage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         prop: 42,
         allGoods: [],
         filteredByIdGoods: [],
         filteredByTitleGoods: [],
         filteredByPriceGoods: [],
         filteredByDescriptionGoods: [],
         searchValue: '',
         searchError: [],
         total: 0,
         showText: false,
         description: '',
         pageSize: 5,
         pageNumber: 1
      };

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.addGoods = this.addGoods.bind(this);
      this.editGoods = this.editGoods.bind(this);
      this.removeGoods = this.removeGoods.bind(this);
   }

   componentDidMount() {
      GoodService.getAllGoods().then((res) => {
         this.setState({ allGoods: res.data });
      });

      GoodService.getTotalAmount().then((res) => {
         this.setState({ total: res.data });
      });
   }

   handlePreviousPageNumberChange = () => {
      const pageNumber = sessionStorage.getItem("pageNumber");
      const { pageSize } = this.state;

       if(pageNumber !== 1) {
         GoodService.getAllGoodsByPages(pageSize, pageNumber - 1).then((res) => {
            this.setState({ allGoods: res.data });
         });
       }
   };

   handlePageNumberChange = (pageNumber) => {
      const { pageSize } = this.state;

      GoodService.getAllGoodsByPages(pageSize, pageNumber).then((res) => {
         this.setState({ allGoods: res.data });
      });

      sessionStorage.setItem("pageNumber", pageNumber);
   };

   handleNextPageNumberChange = () => {
      let pageNumber = sessionStorage.getItem("pageNumber");
      const { total, pageSize } = this.state;

      if (pageSize * pageNumber > total) {
         pageNumber ++;

         GoodService.getAllGoodsByPages(pageSize, +pageNumber + 1).then((res) => {
             this.setState({ allGoods: res.data });
         });
      } else {
          GoodService.getAllGoodsByPages(pageSize, +pageNumber + 1).then((res) => {
             this.setState({ allGoods: res.data });
          });
      }
   };

   handleMouseEnter = (goodId, event) => {
      GoodService.getGoodById(goodId).then((res) => {
         let good = res.data;

         this.setState({
            description: good.description,
         });
      });

      this.setState({ showText: true });
   }

   handleMouseLeave = (event) => {
      this.setState({ showText: false });
   }

   handleLogout = () => {
      window.location.href = "/";
   };

   addGoods() {
      sessionStorage.setItem("goodId", -1);

      this.props.history.push('/add-edit');
   }

   editGoods(goodId) {
       sessionStorage.setItem("goodId", goodId);

       this.props.history.push('/add-edit');
   }

   removeGoods(goodId) {
       const goods = this.state.allGoods;

      GoodService.deleteGood(goodId).then( res => {
         const data = goods.filter(i => i.id !== goodId);

         this.setState({allGoods : data});
         this.setState({filteredByIdGoods : data});
         this.setState({filteredByTitleGoods : data});
         this.setState({filteredByPriceGoods : data});
         this.setState({filteredByDescriptionGoods : data});

         goodId--;
      });
   }

   handleSortGoodsAsc = (event, field) => {
      GoodService.getAllSortedGoods(field).then((res) => {
         this.setState({ allGoods: res.data })
      });
   }

   handleSortGoodsDesc = (event, field) => {
      GoodService.getAllDescSortedGoods(field).then((res) => {
         this.setState({ allGoods: res.data })
      });
   }

   handleSearchGood = (event) => {
      const { total } = this.state;
      const searchValue = event.target.value;

      this.setState({ noAccessToChangeGood: "" });

      if (searchValue === '') {
          GoodService.getAllGoods().then((res) => {
             this.setState({ allGoods: res.data });
          });
      }

      GoodService.getAllGoodsSearchedById(searchValue, total).then((res) => {
          this.setState({ filteredByIdGoods: res.data });
      })

      GoodService.getAllGoodsSearchedByTitle(searchValue, total).then((res) => {
          this.setState({ filteredByTitleGoods: res.data });
      })

      GoodService.getAllGoodsSearchedByPrice(searchValue, total).then((res) => {
          this.setState({ filteredByPriceGoods: res.data });
      })

      GoodService.getAllGoodsSearchedByDescription(searchValue, total).then((res) => {
          this.setState({ filteredByDescriptionGoods: res.data });
      })
   }

   render() {
     const { allGoods, filteredByIdGoods, filteredByTitleGoods, filteredByPriceGoods, filteredByDescriptionGoods,
            searchValue, showText, description, total, pageNumber, noAccessToChangeGood } = this.state;

     const { handleSearchGood, handleSortGoodsAsc, handleSortGoodsDesc, addGoods, editGoods, removeGoods,
            handleMouseEnter, handleMouseLeave, handlePageNumberChange, handlePreviousPageNumberChange,
            handleNextPageNumberChange, handleLogout} = this;

     return (
        <div>
             <div className="buttons-container">
                <Button component={Link} to="/ordersList" variant="contained" color="primary">
                    Orders list
                </Button>
                <Typography component="h2" variant="h3">
                    Goods table
                </Typography>
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                >
                    Logout
                </Button>
             </div>
             <div className="table-container">
                <div className="container__from-wrapper">
                    <form>
                        <table>
                            <tr className="table">
                                <td>
                                    <TextField
                                        onChange={handleSearchGood}
                                        variant="outlined"
                                        placeholder="Enter text to search"
                                    />
                                </td>
                                {showText &&
                                    <td>
                                        <Typography
                                             component="h5"
                                             variant="h5"
                                             style={{color: 'blue'}}
                                        >
                                             {description}
                                        </Typography>
                                    </td>
                                }
                            </tr>
                        </table>
                    </form>
                </div><br/>
                <AppBar position="static">
                    <GoodsTable
                        handleMouseEnterCallback={handleMouseEnter}
                        handleMouseLeaveCallback={handleMouseLeave}
                        sortAscCallback={handleSortGoodsAsc}
                        sortDescCallback={handleSortGoodsDesc}
                        addCallback={addGoods}
                        editCallback={editGoods}
                        deleteCallback={removeGoods}
                        goods = {
                            filteredByIdGoods.length > 0 ?
                            filteredByIdGoods:
                            filteredByTitleGoods.length > 0 ?
                            filteredByTitleGoods :
                            filteredByPriceGoods.length > 0?
                            filteredByPriceGoods :
                            filteredByDescriptionGoods.length > 0?
                            filteredByDescriptionGoods : allGoods
                        }
                        total = {total}
                        selected = {
                            filteredByIdGoods.length > 0 ?
                            filteredByIdGoods.length:
                            filteredByTitleGoods.length > 0 ?
                            filteredByTitleGoods.length :
                            filteredByPriceGoods.length > 0?
                            filteredByPriceGoods.length :
                            filteredByDescriptionGoods.length > 0?
                            filteredByDescriptionGoods.length : 0
                        }
                    />
                </AppBar><br/>
                <div>
                    <table>
                        <tr className="table">
                            <td>
                               <Button
                                   size="large"
                                   variant="contained"
                                   color="secondary"
                                   type="reset"
                                   onClick={addGoods}
                               >
                                   Add Goods
                               </Button>
                            </td>
                            <td>
                                <div  className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={handlePreviousPageNumberChange}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(1)}
                                    >
                                        {pageNumber}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="secondary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(2)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={() => handlePageNumberChange(3)}
                                    >
                                        {pageNumber + 2}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className="container__button-wrapper">
                                    <button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        type="reset"
                                        onClick={handleNextPageNumberChange}
                                    >
                                        Next
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
             </div>
        </div>
     );
   }
 }

export default AdminPage;